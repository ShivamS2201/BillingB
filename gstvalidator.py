import re

class GSTINValidator:
    GSTINFORMAT_REGEX = r"[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[Z]{1}[0-9a-zA-Z]{1}"
    GSTN_CODEPOINT_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    @staticmethod
    def main():
        # Sample valid GSTIN - 09AAAUP8175A1ZG
        gstin = input("Enter GSTIN Number: ").strip()
        try:
            if GSTINValidator.valid_gstin(gstin):
                print("Valid GSTIN!")
            else:
                print("Invalid GSTIN")
        except Exception as e:
            print(e)

    @staticmethod
    def valid_gstin(gstin):
        is_valid_format = False
        if GSTINValidator.check_pattern(gstin, GSTINValidator.GSTINFORMAT_REGEX):
            is_valid_format = GSTINValidator.verify_check_digit(gstin)
        return is_valid_format

    @staticmethod
    def verify_check_digit(gstin_with_check_digit):
        is_cd_valid = False
        new_gstin_with_check_digit = GSTINValidator.get_gstin_with_check_digit(
            gstin_with_check_digit[:-1]
        )

        if gstin_with_check_digit.strip() == new_gstin_with_check_digit:
            is_cd_valid = True

        return is_cd_valid

    @staticmethod
    def check_pattern(input_val, regex_pattern):
        return bool(re.match(regex_pattern, input_val.strip()))

    @staticmethod
    def get_gstin_with_check_digit(gstin_wo_check_digit):
        factor = 2
        mod = len(GSTINValidator.GSTN_CODEPOINT_CHARS)
        sum_val = 0
        check_code_point = 0

        cp_chars = list(GSTINValidator.GSTN_CODEPOINT_CHARS)
        input_chars = list(gstin_wo_check_digit.upper().strip())

        for i in range(len(input_chars) - 1, -1, -1):
            code_point = cp_chars.index(input_chars[i])
            digit = factor * code_point
            factor = 1 if factor == 2 else 2
            digit = (digit // mod) + (digit % mod)
            sum_val += digit

        check_code_point = (mod - (sum_val % mod)) % mod
        return gstin_wo_check_digit + cp_chars[check_code_point]


if __name__ == "__main__":
    GSTINValidator.main()

##ANALISYS:
#-----------

# Let's analyze the time and space complexity of the provided JavaScript code:

# Time Complexity:
# main function:

# Reading the input using prompt takes constant time, O(1).
# The validGSTIN function has a time complexity of O(N), where N is the length of the input GSTIN.
# The verifyCheckDigit and getGSTINWithCheckDigit functions also have a time complexity of O(N).
# Overall, the time complexity of the main function is O(N).
# validGSTIN function:

# The checkPattern function has a time complexity of O(N), where N is the length of the input GSTIN.
# The verifyCheckDigit function has a time complexity of O(N).
# Overall, the time complexity of the validGSTIN function is O(N).
# getGSTINWithCheckDigit function:

# The loop iterates through the characters of the input GSTIN, resulting in a time complexity of O(N), where N is the length of the input GSTIN.
# Overall, the time complexity of the getGSTINWithCheckDigit function is O(N).
# Space Complexity:
# Variables:

# The space complexity is mainly determined by the variables used in the functions.
# Most variables store primitive data types or small constant-sized arrays, resulting in constant space usage, O(1).
# Function Calls:

# Function calls are added to the call stack, but in this case, the depth of the call stack is not dependent on the input size, so it's considered constant space, O(1).
# Strings and Arrays:

# The input GSTIN and intermediate strings and arrays are stored in memory. The space complexity is O(N), where N is the length of the input GSTIN.
# Overall Complexity:
# Time Complexity: O(N)
# Space Complexity: O(N)
# The overall time and space complexity is linear, where N is the length of the input GSTIN. Keep in mind that constant factors and lower-order terms are omitted in big O notation, so the actual performance may vary based on specific details of the JavaScript runtime.