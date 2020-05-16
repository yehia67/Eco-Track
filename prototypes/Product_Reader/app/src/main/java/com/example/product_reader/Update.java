package com.example.product_reader;

import com.google.gson.JsonObject;

import org.json.JSONObject;

public class Update {
    String qrCode ;
    JSONObject product ;

    public String getQrCode() {
        return qrCode;
    }

    public JSONObject getUpdateObject() {
        return product;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public void setUpdateObject(JSONObject updateObject) {
        this.product = updateObject;
    }
}
