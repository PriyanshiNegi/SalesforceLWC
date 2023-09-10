public with sharing class AcountController {
    // gives Accounts
    @AuraEnabled(cacheable=true)
    public static List<Account> gettingAccounts(){
        return [SELECT Id, Name, Type, Industry FROM Account LIMIT 10];
    }

    // gives filtered Accounts of a particular Type
    @AuraEnabled(cacheable=true)
    public static List<Account> gettingFilteredAccounts(String type){
        return [SELECT Id, Name, Type, Industry FROM Account  WHERE Type=:type  LIMIT 5];
    }

    // gives Accounts from searched term
    @AuraEnabled(cacheable=true)
    public static List<Account> gettingSearchedAccounts(String searchKey){
        String key = '%'+searchKey+'%';
        return [SELECT Id, Name, Type, Industry FROM Account WHERE Name LIKE :key  LIMIT 5];
    }
}