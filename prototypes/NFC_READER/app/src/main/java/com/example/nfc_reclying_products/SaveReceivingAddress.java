package com.example.nfc_reclying_products;

import android.widget.EditText;

import static java.lang.Character.isLowerCase;
import static java.lang.Character.isUpperCase;

public class SaveReceivingAddress {

    public boolean checkAddress(String address) {
        if ((address.codePointCount(0,address.length()) == 90 || address.codePointCount(0,address.length()) == 81)) {
            for (int i = 0; i < address.length(); i++) {
                if (address.indexOf(i) != '9' && isLowerCase(address.indexOf(i))) {
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }



}
