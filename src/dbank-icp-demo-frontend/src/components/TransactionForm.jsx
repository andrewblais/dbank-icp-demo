import formatWithCommas from "../utils/formatWithCommas";

/// Renders the transaction form for deposits and withdrawals.
///
/// - Formats user input with commas and restricts decimal precision
/// - Prevents invalid characters and malformed numbers
/// - Button changes text and styling based on form state
function TransactionForm({
    transactionType,
    setTransactionType,
    amount,
    setAmount,
    handleFormSubmit,
    isFormEmpty,
    buttonIsDisabled,
}) {
    /// Sanitizes and formats input as user types:
    const handleAmountChange = (e) => {
        const raw = e.target.value;
        const cleaned = raw.replace(/[^\d.,]/g, ""); // allow only digits, comma, and dot
        const numeric = cleaned.replace(/,/g, ""); // strip commas for parsing

        // Accept numbers with optional commas + up to 2 decimals
        const validPattern = /^\d{0,3}(,\d{3})*(\.\d{0,2})?$|^\d*\.?\d{0,2}$/;
        if (!validPattern.test(numeric)) return;

        const formatted = formatWithCommas(numeric);
        setAmount(formatted);
    };

    return (
        <form className="form-container" onSubmit={handleFormSubmit}>
            <label htmlFor="transaction-select">TRANSACTION TYPE</label>
            <select
                id="transaction-select"
                className="transaction-type"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
            >
                <option value="deposit">deposit</option>
                <option value="withdraw">withdraw</option>
            </select>

            <label htmlFor="amount-input">AMOUNT</label>
            <input
                id="amount-input"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="mono amount-input"
            />

            <button
                type="submit"
                className={`mono submit-btn ${
                    isFormEmpty
                        ? "empty"
                        : buttonIsDisabled
                          ? "finalizing"
                          : "ready"
                }`}
                disabled={buttonIsDisabled || isFormEmpty}
                aria-live="polite"
            >
                {isFormEmpty ? (
                    "waiting for amount"
                ) : buttonIsDisabled ? (
                    <>
                        <span className="spinner" aria-hidden="true" />
                        finalizing transaction
                    </>
                ) : (
                    "finalize transaction"
                )}
            </button>
        </form>
    );
}

export default TransactionForm;
