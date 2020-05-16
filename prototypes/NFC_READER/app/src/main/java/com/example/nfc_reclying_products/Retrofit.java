package com.example.nfc_reclying_products;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.converter.gson.GsonConverterFactory;

public class Retrofit {

    OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .connectTimeout(2, TimeUnit.MINUTES)
            .readTimeout(2, TimeUnit.MINUTES)
            .writeTimeout(2, TimeUnit.MINUTES)
            .build();


    //instance of retrofit
    retrofit2.Retrofit retrofit = new retrofit2.Retrofit.Builder()
            .baseUrl("http://192.168.1.3:5002/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build();

}
