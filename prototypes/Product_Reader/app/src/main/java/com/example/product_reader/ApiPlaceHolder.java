package com.example.product_reader;

import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;

public interface ApiPlaceHolder {

    @GET("products/info")
    Call<JsonObject>getProductInfo(@Query("qrCode") String qrCode);
    //Call<List<ProductInfo>>getProductInfo(@Query("qrCode") QrCode qrCode);


    @GET("products/history")
    Call<ArrayList<JsonObject>>getProductHistory(@Query("qrCode") String qrCode);

    @GET("user/info")
    Call<JsonObject>getProducerInfo(@Query("key") String key);

    @PUT("products/update")
    Call<String>putUpdate(@Body Update update);


}
