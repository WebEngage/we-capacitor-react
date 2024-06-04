package com.webEngage.production;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private ActivityResultLauncher<String> requestPermissionLauncher;

  // Below code can be used to get Android 13 push permission for Android
    // @Override
    // public void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);

    //     // Initialize the ActivityResultLauncher
    //     requestPermissionLauncher = registerForActivityResult(
    //             new ActivityResultContracts.RequestPermission(),
    //             isGranted -> {
    //                 if (isGranted) {
    //                     // Permission is granted. Continue with the notification process.
    //                 } else {
    //                     // Permission is denied. Inform the user that notifications won't be shown.
    //                 }
    //             });

    //     // Check for Android 13 and above
    //     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    //         checkAndRequestNotificationPermission();
    //     }
    // }

    // private void checkAndRequestNotificationPermission() {
    //     if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
    //             PackageManager.PERMISSION_GRANTED) {
    //         // Permission is already granted. You can proceed with notifications.
    //     } else if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.POST_NOTIFICATIONS)) {
    //         // In this case, you might want to show a rationale to the user and then request permission.
    //         requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
    //     } else {
    //         // Directly request for permission
    //         requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
    //     }
    // }
}
