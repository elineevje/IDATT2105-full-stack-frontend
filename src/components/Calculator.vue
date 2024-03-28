<template>
    <div class="calculator">
        <div class="display">{{ current || 0 }}</div>
        <div @click="clear" class="button">C</div>
        <div @click="sign" class="button">+/-</div>
        <div @click="percentage" class="button">%</div>
        <div @click="setOperator('/')" class="button operator">/</div>
        <div @click="append('7')" class="button">7</div>
        <div @click="append('8')" class="button">8</div>
        <div @click="append('9')" class="button">9</div>
        <div @click="setOperator('*')" class="button operator">x</div>
        <div @click="append('4')" class="button">4</div>
        <div @click="append('5')" class="button">5</div>
        <div @click="append('6')" class="button">6</div>
        <div @click="setOperator('-')" class="button operator">-</div>
        <div @click="append('1')" class="button">1</div>
        <div @click="append('2')" class="button">2</div>
        <div @click="append('3')" class="button">3</div>
        <div @click="setOperator('+')" class="button operator">+</div>
        <div @click="append('0')" class="button zero_button">0</div>
        <div @click="comma" class="button">.</div>
        <div @click="equal" class="button operator">=</div>
        <div class="log-box">
            <h2>Calculation log</h2>
            <ul>
                <li v-for="(item, index) in history" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "CalculatorApp",
    data() {
        return {
            current: "",
            operator: null,
            firstNumber: null,
            secondNumber: null,
            previous: "",
            history: [],
            apiUrl: "http://localhost:8080"
        };
    },

    methods: {
        clear() {
            this.current = "";
            this.operator = null;
            this.firstNumber = null;
            this.secondNumber = null;
        },
        sign() {
            if (
                typeof this.current === "string" &&
                this.current !== "" &&
                this.current !== "0"
            ) {
                const regex = /(-?\d*\.?\d+)$/;
                const match = this.current.match(regex);

                if (match) {
                    const lastNumber = match[1];
                    const toggledNumber = lastNumber.startsWith("-")
                        ? lastNumber.slice(1)
                        : `-${lastNumber}`;
                    this.current = this.current.replace(regex, toggledNumber);
                }
            }
        },
        percentage() {
            try {
                const originalCalculation = this.current;
                const result = (eval(this.current) / 100).toString();
                this.current = result;
                this.history.unshift(`${originalCalculation} = ${result}%`);
            } catch (e) {
                this.history.unshift("Invalid calculation");
            }
        },
        setOperator(operator) {
            if (this.current !== "") {
                // If no operator is set, set the operator and update the first number
                if (this.operator === null) {
                    this.firstNumber = parseFloat(this.current) || 0;
                    this.current = "";
                } else {
                    // If an operator is already set, update the second number and perform the calculation
                    this.secondNumber = parseFloat(this.current) || 0;
                    this.equal();
                }
                // Set the operator and append it to the current display
                this.operator = operator;
                this.current += operator;
            }
        },
        append(number) {
            if (this.equalsClicked) {
                // Clear the calculator and start a new calculation if equals was clicked
                this.clear();
                this.equalsClicked = false;
            }
            // If an operator is set, append the number to the second number
            if (this.operator !== null) {
                this.current += number;
                this.secondNumber = parseFloat(this.current.slice(this.current.lastIndexOf(this.operator) + 1)) || 0;
            } else {
                // If no operator is set, append the number to the first number
                this.current += number;
                this.firstNumber = parseFloat(this.current) || 0;
            }
            // If all components of the calculation are set, update the current display
            if (this.firstNumber !== null && this.operator !== null && this.secondNumber !== null) {
                this.current = `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
            }
        },
        comma() {
            if (typeof this.current === "string") {
                const operands = this.current.split(/[-+*/]/);
                const lastOperand = operands[operands.length - 1];
                if (!lastOperand.includes(".")) {
                    this.append(".");
                }
            }
        },
        async sendCalculationRequest() {
            const requestBody = {
                firstNumber: this.firstNumber,
                operator: this.operator,
                secondNumber: this.secondNumber
            };

            try {
                const response = await axios.post(
                    `${this.apiUrl}/calculate`,
                    requestBody
                );

                const calculation = `${this.firstNumber} ${this.operator} ${this.secondNumber}`;
                const result = response.data.answer;

                this.history.unshift(`Calculation: ${calculation}` + `    Results: ${result}`);
                this.current = result.toString();
            } catch (error) {
                console.error(error.response.data);
            }
        },
        async equal() {
            try {
                await this.sendCalculationRequest();
                this.equalsClicked = true;
            } catch (error) {
                this.history.unshift("Invalid calculation");
            }
        }
    }
};
</script>

<style scoped>
.calculator {
    margin: 0 auto;
    width: 400px;
    font-size: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);
}

.display {
    grid-column: 1 / 5;
    background-color: #dff2ff;
    color: pink;
    border: 1px solid #999;
}

.zero_button {
    grid-column: 1 / 3;
}

.button {
    background-color: pink;
    border: 1px solid #999;
}

.operator {
    background-color: #6879d0;
    color: white;
}

.log-box {
    grid-column: span 4;
    font-size: 24px;
}
</style>
