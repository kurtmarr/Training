﻿$(document).ready(function () {
    var ls = new myNS.LocalStorage();
    ls.loadSettings();
    $('#SubmitButton').click(function () {
        if (ls.hasLocalStorage) ls.storeSettings();
        else alert('No local storage support');
    });
    $('#ClearButton').click(function () {
        localStorage.clear();
        ls.loadSettings();
    });
});

var myNS = myNS || {};

myNS.LocalStorage = function () {

};

myNS.LocalStorage.prototype = function () {
    //private members
    var loadSettings = function () {
        var name = localStorage.getItem('name');
        var state = localStorage.getItem('state');
        $('#NameTextBox').val(name);
        $('#StatesSelect').val(state);
    },

    storeSettings = function () {
        try {
            localStorage.setItem('name', $('#NameTextBox').val());
            localStorage.setItem('state', $('#StatesSelect').val());
            $('#OutputSpan').html('Settings Saved!');
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Storage quota exceeded');
            }
        }
    },

    hasLocalStorage = function () {
        return ('localStorage' in window && window['localStorage'] != null);
    };

    //public members
    return {
        loadSettings: loadSettings,
        storeSettings: storeSettings,
        hasLocalStorage: hasLocalStorage
    };
} ();

