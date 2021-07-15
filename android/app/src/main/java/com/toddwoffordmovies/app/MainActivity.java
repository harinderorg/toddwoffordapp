package com.toddwoffordmovies.app;

 import android.content.Intent;
import android.os.Bundle;
import co.boundstate.BranchDeepLinks;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
 import android.content.Context;
 import android.os.CountDownTimer;
 import android.widget.Button;
 import android.media.AudioManager;
import app.xplatform.capacitor.plugins.AdMob;
import java.util.ArrayList;
// import com.google.android.gms.ads.AdError;
// import com.google.android.gms.ads.AdRequest;
// import com.google.android.gms.ads.FullScreenContentCallback;
// import com.google.android.gms.ads.LoadAdError;
// import com.google.android.gms.ads.MobileAds;
// import com.google.android.gms.ads.initialization.InitializationStatus;
// import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
// import com.google.android.gms.ads.interstitial.InterstitialAd;
// import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

public class MainActivity extends BridgeActivity {
 



   


  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

  
    Context context = getApplicationContext();
    AudioManager audioManager = ((AudioManager)context.getSystemService(Context.AUDIO_SERVICE));
    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    	 add(BranchDeepLinks.class);
       add(AdMob.class);
    }});



      
  }

    @Override
  protected void onNewIntent(Intent intent) {
    this.setIntent(intent);
    super.onNewIntent(intent);
  }
}
