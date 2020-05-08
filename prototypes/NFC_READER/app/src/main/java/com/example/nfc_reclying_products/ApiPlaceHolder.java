package com.example.nfc_reclying_products;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiPlaceHolder {

    @GET("balance")
    Call<Integer> getBalance(@Query("address") String address);

    @POST("giveReward")
    Call<String> giveReward(@Body ProductAddress product_address);

    @POST("addOwner")
    Call<String> addOwner(@Body AddOwner addOwner);

}
