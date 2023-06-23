let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");
let router = require("express").Router();

router.post('/', (req, res, next) => {
    const expenses = req.body.expenses; 
    let total = 0;
    let payouts = [];
    let map = new Map();

    for(let i=0; i<expenses.length; i++){
        total += +expenses[i].amount;
        if(map.has(expenses[i].name)) {
            map.set(expenses[i].name, map.get(expenses[i].name) + +expenses[i].amount);
        } else {
            map.set(expenses[i].name, +expenses[i].amount);
        }
    }

    const equalShare = total / map.size;

    let debtors = [];
    let creditors = [];


    for(let [key, value] of map) {
        if(value < equalShare) {
            debtors.push({name: key, owes: equalShare - value});
        } else if(value > equalShare) {
            creditors.push({name: key, owed: value - equalShare});
        }
    }

    for(let debtor of debtors) {
        for(let creditor of creditors) {
            if(debtor.owes > 0 && creditor.owed > 0) {
                if(creditor.owed > debtor.owes) {
                    payouts.push({owes: debtor.name, owed: creditor.name, amount: debtor.owes});
                    creditor.owed -= debtor.owes;
                    debtor.owes = 0;
                } else {
                    payouts.push({owes: debtor.name, owed: creditor.name, amount: creditor.owed});
                    debtor.owes -= creditor.owed;
                    creditor.owed = 0;
                }
            }
        }
    }


    next(new OkResponse({
        total: total,
        equalShare: equalShare,
        payouts: payouts
    }));
});

module.exports = router;