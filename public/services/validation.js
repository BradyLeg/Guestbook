export function validateForm(data) {

    const errors = [];

    if (!data.mail) {
        errors.push("Missing mail value")
    } else {
        const validOptions = ["yes", "no"]
        if (!validOptions.includes(data.mail)) {
            errors.push("Invaild mail value");
        }
    }

    if (!data.first || data.first.trim() === "") {
        errors.push("First name is invalid");
    }

    if (!data.last || data.last.trim() === "") {
        errors.push("Last name is invalid");
    }

    if (!data.email || data.email.trim() === "" || data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
        errors.push("Email is invalid");
    }

    if (!data.job || data.job.trim() === "") {
        errors.push("Job title is invalid");
    }

    if (!data.company || data.company.trim() === "") {
        errors.push("Company name is invalid");
    }

    if (!data.linkedin || data.linkedin.trim() === "") {
        errors.push("Linkedin URL is invalid");
    }

    if (data.met === "none") {
        errors.push("Meet option is invalid");
    } else {
        const validOptions = ["meetup", "jobfair", "school", "other"];
        if (!validOptions.includes(data.met)) {
            errors.push("Please select a valid met option");
        }
    }

    if (!data.format) {
        errors.push("Missing format value")
    } else {
        const validOptions = ["html", "text"]
        if (!validOptions.includes(data.format)) {
            errors.push("Invaild format value");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };

}