const choices = require ('../schema/keys')

choices.countDocuments().then(choicesCount => {
    if (choicesCount == 0) {
    choices.insertMany ([
        {header : 'lastname' , matchingString :['lastname', 'name', 'nom','namelast']},
        {header :'FirstName' ,  matchingString : ['fisrstname' , 'prenom' , 'namefirst']},
        {header : 'Language' , matchingString : ['language' , 'langue']},
        {header : 'PayId' , matchingString : ['payid']},
        {header : 'PayId2' , matchingString : ['payid2']},
        {header : 'PayId3' , matchingString : ['payid3']},
        {header : 'PayId4' , matchingString : ['payid4']},
        {header : 'PayId5' , matchingString : ['payid5']},
        {header : 'PayId6' , matchingString : ['payid6']},
        {header : 'Mail' , matchingString : ['email','mail']},
        {header : 'ManagerMail', matchingString : ['ManagerMail' , 'managermail']},
        {header : 'ManagerPayId' , matchingString : ['ManagerPayId' , 'managerpayid']},
        {header : 'IsAdmin' , matchingString : ['IsAdmin', 'isadmin','admin']},
        {header : 'IsAccountant' , matchingString : ['IsAccountant' , 'isaccountant','account']},
        {header : 'Tags' , matchingString : ['Tags','tags','tag']},
        {header : 'LocalCountry' , matchingString : ['localcountry','country']},
        {header : 'LocalCurrency' , matchingString : [ 'localcurrency' , 'cuurency' , 'Currency']},
        {header : 'ReviewerMail' , matchingString:[ 'reviewrmail']},
        {header : 'ReviewerPayId' , matchingString : [ 'reviewerpayid']},
        {header : 'DefaultProjectExternalId' , matchingString : [ 'defaultprojectexternalid']},
        {header : 'IsActive' , matchingString :['isactive','active']},
        {header : 'MailAlias' , matchingString :[ 'mailalias']},
        {header : 'MileageRate' , matchingString :['mileagerate']},
        {header : 'IKReference' , matchingString : [ 'ikreferance']}
    ]);
}
    })