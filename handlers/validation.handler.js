class ValidationHandler {
    static regex(value, reg) {
        if (value !== '') {
            if (reg.test(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

module.exports = ValidationHandler;
