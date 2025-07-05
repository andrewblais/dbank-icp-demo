import { useState, useEffect } from "react";

import { dbank_icp_demo_backend as dbank } from "declarations/dbank-icp-demo-backend";
import logo from "./assets/dbank_icp_demo.svg";

import Balance from "./components/Balance";
import HelpTooltipButton from "./components/HelpTooltipButton";
import AlertBox from "./components/AlertBox";
import TransactionForm from "./components/TransactionForm";
import PopoverButton from "./components/PopoverButton";

/// DBank Frontend (React)
///
/// Simulates a token savings account with compound interest:
/// - Deposit and withdraw ICP-like funds
/// - Interest accrues at 5% APR, compounded per second
/// - Sliders control time acceleration and refresh rate
/// - React frontend calls a Motoko backend for all updates
function App() {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [transactionType, setTransactionType] = useState("deposit");
    const [amount, setAmount] = useState("");
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [showAlertWarning, setShowAlertWarning] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [acceleration, setAcceleration] = useState(1);
    const [refreshRateMs, setRefreshRateMs] = useState(60000); // Default: 60 seconds

    const numericAmount = parseFloat(amount.replace(/,/g, "").trim());
    const isFormEmpty = isNaN(numericAmount) || numericAmount <= 0;

    /// Queries backend for updated balance, applying interest.
    async function updateBalance() {
        const newBalance = await dbank.checkBalanceWithSpeed(acceleration);
        console.log(`Fetched balance at ${acceleration}x:`, newBalance);
        setCurrentBalance(parseFloat(newBalance.toFixed(2)));
    }

    /// Auto-hides the overdraft alert after 5 seconds.
    useEffect(() => {
        if (showAlertWarning) {
            const timer = setTimeout(() => setShowAlertWarning(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlertWarning]);

    /// Auto-hides the success alert after 5 seconds.
    useEffect(() => {
        if (showAlertSuccess) {
            const timer = setTimeout(() => setShowAlertSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlertSuccess]);

    /// Periodically updates balance based on selected refresh interval.
    useEffect(() => {
        updateBalance();
        const interval = setInterval(updateBalance, refreshRateMs);
        return () => clearInterval(interval);
    }, [acceleration, refreshRateMs]);

    /// Handles deposit or withdrawal form submission.
    async function handleFormSubmit(event) {
        event.preventDefault();
        setButtonIsDisabled(true);

        try {
            if (
                transactionType === "withdraw" &&
                numericAmount > currentBalance
            ) {
                setShowAlertWarning(true);
                return;
            }

            if (!isNaN(numericAmount) && numericAmount > 0) {
                if (transactionType === "deposit") {
                    await dbank.addValue(numericAmount);
                } else {
                    await dbank.removeValue(numericAmount);
                }
                setAmount("");
                await updateBalance();
                setShowAlertSuccess(true);
            }
        } finally {
            setButtonIsDisabled(false);
        }
    }

    return (
        <main className="main-container">
            <div>
                <img src={logo} alt="DBank ICP demo logo" width="225px" />
            </div>

            <PopoverButton
                buttonLabel="instructions"
                popupText="Simulate compound interest on your ICP balance. Deposit, withdraw, and adjust settings to explore real-world growth over time."
            />

            <div className="specs-container-parent">
                <Balance currentBalance={currentBalance} />

                {/* Slider: Interest Acceleration */}
                <div className="acceleration">
                    <div className="specs-container-child">
                        <div className="specs-label-flex">
                            <label htmlFor="speed" className="flex-label">
                                accelerate interest
                            </label>
                            <HelpTooltipButton
                                tooltipTitle="Adjust slider to increase speed at which interest accumulates."
                                ariaLabel="Interest info"
                            />
                        </div>
                        <input
                            id="speed"
                            type="range"
                            min="1"
                            max="1000"
                            step="1"
                            value={acceleration}
                            onChange={(e) =>
                                setAcceleration(parseInt(e.target.value))
                            }
                        />
                        <span>{acceleration}x</span>
                    </div>
                </div>

                {/* Slider: Refresh Rate */}
                <div className="acceleration">
                    <div className="specs-container-child">
                        <div className="specs-label-flex">
                            <label htmlFor="refresh" className="flex-label">
                                refresh rate
                            </label>
                            <HelpTooltipButton
                                tooltipTitle="Adjust how often the balance syncs with the backend."
                                ariaLabel="Refresh info"
                            />
                        </div>
                        <input
                            id="refresh"
                            type="range"
                            min="1000"
                            max="60000"
                            step="1000"
                            value={refreshRateMs}
                            onChange={(e) =>
                                setRefreshRateMs(parseInt(e.target.value))
                            }
                        />
                        <span>{refreshRateMs / 1000}s</span>
                    </div>
                </div>
            </div>

            <AlertBox
                severity="warning"
                showAlert={showAlertWarning}
                onClose={() => setShowAlertWarning(false)}
                displayText="Lower withdrawal amount."
            />

            <AlertBox
                severity="success"
                showAlert={showAlertSuccess}
                onClose={() => setShowAlertSuccess(false)}
                displayText="Transaction successful."
            />

            <TransactionForm
                transactionType={transactionType}
                setTransactionType={setTransactionType}
                amount={amount}
                setAmount={setAmount}
                handleFormSubmit={handleFormSubmit}
                isFormEmpty={isFormEmpty}
                buttonIsDisabled={buttonIsDisabled}
            />
        </main>
    );
}

export default App;
