<template>
    <div>
        <h1>Feedback form</h1>
        <form>
            <label>Name: </label>
            <input
                    data-cy="name-input"
                    type="text"
                    placeholder="Enter name"
                    v-model="form.name"
                    class="container"
                    @input="clearError('Name is required')"
            />
            <div class="error-message-container">
                <div class="error-message" v-if="hasNameError">
                    {{ error.find((err) => err.includes("Name is required")) }}
                </div>
            </div>
            <br />

            <label>Email: </label>
            <input
                    data-cy="email-input"
                    type="text"
                    placeholder="Enter email"
                    v-model="form.email"
                    class="container"
                    @input="clearError('Email is invalid')"
            />
            <div class="error-message-container">
                <div class="error-message" v-if="hasEmailError">
                    {{ error.find((err) => err.includes("Email is invalid")) }}
                </div>
            </div>
            <br />

            <label>Message: </label>
            <input
                    data-cy="message-input"
                    type="text"
                    placeholder="Enter message"
                    v-model="form.message"
                    class="container"
            />
            <div class="error-message-container">
                <div class="error-message" v-if="hasMessageError">
                    {{ error.find((err) => err.includes("Message is required")) }}
                </div>
            </div>
            <br />

            <button
                    data-cy="submit-button"
                    v-on:click="submit"
                    :disabled="isSubmitDisabled"
                    type="button"
                    class="submitButton"
                    :class="{ disabled: isSubmitDisabled }"
            >
                Submit
            </button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "contactForm",
    data() {
        return {
            form: {
                name: localStorage.getItem("savedName") || "",
                email: localStorage.getItem("savedEmail") || "",
                message: "",
                nameError: false,
                emailError: false,
                messageError: false
            },
            error: [],
            submittedData: null
        };
    },
    computed: {
        hasNameError() {
            return this.form.nameError;
        },
        hasEmailError() {
            return this.form.emailError;
        },
        hasMessageError() {
            return this.form.messageError;
        },
        isSubmitDisabled() {
            return (
                this.form.nameError ||
                this.form.emailError ||
                this.form.messageError ||
                this.form.name.trim().length === 0 ||
                !this.isValidEmail(this.form.email.trim()) ||
                this.form.message.trim().length === 0
            );
        }
    },
    methods: {
        submit() {
            this.error = [];

            if (this.form.name.trim().length === 0) {
                this.error.push("Name is required.");
                this.form.nameError = true;
            } else {
                this.form.nameError = false;
            }

            if (!this.isValidEmail(this.form.email.trim())) {
                this.error.push("Email is invalid.");
                this.form.emailError = true;
            } else {
                this.form.emailError = false;
            }

            if (this.form.message.trim().length === 0) {
                this.error.push("Message is required.");
                this.form.messageError = true;
            } else {
                this.form.messageError = false;
            }

            if (this.error.length === 0) {
                localStorage.setItem("savedName", this.form.name);
                localStorage.setItem("savedEmail", this.form.email);

                axios
                    .post("http://localhost:3001/submissions", this.form)
                    .then((response) => {
                        console.log("Backend response:", response.data);
                        alert("Form submitted successfully!");
                    })
                    .catch((error) => {
                        console.error("Error submitting form:", error);
                        alert("An error occurred while submitting the form.");
                    });

                this.form.message = "";
                this.error = [];
            } else {
                console.warn("Form validation failed:", this.error);
            }
        },
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        clearError(errorMessage) {
            this.error = this.error.filter((err) => !err.includes(errorMessage));

            if (errorMessage === "Name is required") {
                this.form.nameError = false;
            } else if (errorMessage === "Email is invalid") {
                this.form.emailError = false;
            } else if (errorMessage === "Message is required") {
                this.form.messageError = false;
            }
        }
    }
};
</script>

<style scoped>
h1 {
    color: pink;
}

.submitButton {
    background-color: pink;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submitButton:hover {
    background-color: #d1478e;
}

.submitButton.disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error-message-container {
    height: 20px;
}

.error-message {
    color: red;
}

.container {
    margin-bottom: 10px;
}
</style>
