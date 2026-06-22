package com.webEngage.production;

import android.app.Application;

import com.webengage.sdk.android.WebEngageActivityLifeCycleCallbacks;
import com.webengage.sdk.android.WebEngageConfig;

public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        WebEngageConfig config = new WebEngageConfig.Builder()
                .setWebEngageKey("~2024be42c")
                .setDebugMode(true)
                .build();

        registerActivityLifecycleCallbacks(new WebEngageActivityLifeCycleCallbacks(this, config));
    }
}
