package com.example.nfc_reclying_products;

import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ApiPlaceHolder {

    @GET("balance")
    Call<Integer> getBalance(@Query("address") String key);
}
