import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";

/// A simple decentralized bank actor that models 5% APR compound interest.
///
/// - The balance accrues interest continuously but is updated lazily.
/// - Interest is applied only during transactions or balance queries.
/// - Time acceleration is supported for demo/simulation purposes.
actor DBank {

    /// Account balance (in virtual USD for display).
    stable var currentValue : Float = 0;

    /// Last timestamp (in nanoseconds) when interest was applied.
    stable var prevStartTime : Int = Time.now();

    /// Applies compound interest to the current balance based on time elapsed
    /// and an optional acceleration factor.
    ///
    /// - `accelerateTime`: a multiplier for perceived elapsed time (e.g. 1, 10, 100).
    /// - Uses continuous compounding formula: A = P * (1 + r)^t
    func syncInterest(accelerateTime : Int) {
        let currentTime = Time.now();
        let timeElapsedNS = currentTime - prevStartTime;

        // Convert elapsed time to seconds (Float).
        let timeElapsedSeconds = Float.fromInt(timeElapsedNS) / 1_000_000_000.0;

        // Apply acceleration factor to perceived time.
        let adjustedSeconds = timeElapsedSeconds * Float.fromInt(accelerateTime);

        // Annual rate converted to per-second for compounding.
        let ratePerSecond = 0.05 / Float.fromInt(365 * 24 * 60 * 60);

        // Compound the balance based on elapsed time.
        let newValue = currentValue * (1.0 + ratePerSecond) ** adjustedSeconds;

        Debug.print("Adjusted seconds elapsed: " # debug_show (adjustedSeconds));
        Debug.print("New balance after interest: " # debug_show (newValue));

        currentValue := newValue;
        prevStartTime := currentTime;
    };

    /// Deposits funds after syncing interest at normal speed (1x).
    public func addValue(amount : Float) {
        syncInterest(1);
        currentValue += amount;

        Debug.print("Deposited: " # debug_show (amount));
        Debug.print("New Balance: " # debug_show (currentValue));
    };

    /// Withdraws funds if sufficient balance exists, syncing interest first.
    public func removeValue(amount : Float) {
        syncInterest(1);
        let tempValue = currentValue - amount;

        if (tempValue >= 0) {
            currentValue := tempValue;
            Debug.print("Withdrawal: " # debug_show (amount));
            Debug.print("New Balance: " # debug_show (currentValue));
        } else {
            Debug.print("Insufficient funds. Balance: " # debug_show (currentValue));
        };
    };

    /// Returns the current balance with interest applied at 1x speed.
    public func checkBalance() : async Float {
        syncInterest(1);
        return currentValue;
    };

    /// Returns the current balance with interest accelerated by a given factor.
    public func checkBalanceWithSpeed(accelerateTime : Int) : async Float {
        syncInterest(accelerateTime);
        return currentValue;
    };
};
