import UIKit
import Capacitor
import WebEngage

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    private var _freshLaunch: Bool = true

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Initialize WebEngage
        let autoRegister = Bundle.main.object(forInfoDictionaryKey: "WEGApnsAutoRegister") as? Bool ?? true
        WebEngage.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions ?? [:], notificationDelegate: nil, autoRegister: autoRegister)

        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
    }

    func applicationWillTerminate(_ application: UIApplication) {
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}

// MARK: - WebEngage Cordova Plugin Compatibility
// These methods are called by WebEngagePlugin.m (compiled in CordovaPluginsStatic pod)
extension AppDelegate {

    @objc class func sharedInstance() -> AppDelegate {
        return UIApplication.shared.delegate as! AppDelegate
    }

    @objc func isFreshLaunch() -> Bool {
        return _freshLaunch
    }

    @objc func setFreshLaunch(_ freshLaunch: Bool) {
        _freshLaunch = freshLaunch
    }

    @objc func presentInAppController() {
        // No-op for Capacitor - in-app handled via JS bridge
    }
}
