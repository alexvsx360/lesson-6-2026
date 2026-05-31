let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slideCounter = document.getElementById("slideCounter");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showSlide(index) {
    if (index < 0 || index >= totalSlides) {
        return;
    }

    slides[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");

    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;

    if (typeof Prism !== "undefined") {
        Prism.highlightAll();
    }
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        changeSlide(1);
    }

    if (event.key === "ArrowRight") {
        changeSlide(-1);
    }
});

function printToOutput(outputId, callback) {
    const output = document.getElementById(outputId);
    const lines = [];
    const originalConsoleLog = console.log;

    output.textContent = "";
    console.clear();

    console.log = (...args) => {
        const line = args.map(formatValue).join(" ");
        lines.push(line);
        originalConsoleLog(...args);
    };

    try {
        callback();
    } catch (error) {
        lines.push(`שגיאה: ${error.message}`);
        originalConsoleLog(error);
    } finally {
        console.log = originalConsoleLog;
        output.textContent = lines.join("\n");
    }
}

function formatValue(value) {
    if (Array.isArray(value)) {
        return `[${value.map(formatValue).join(", ")}]`;
    }

    if (typeof value === "object" && value !== null) {
        return JSON.stringify(value, null, 2);
    }

    return String(value);
}

const demos = {
    ifElse() {
        const grade = 82;

        if (grade >= 90) {
            console.log("מצוין");
        } else if (grade >= 75) {
            console.log("טוב מאוד");
        } else if (grade >= 60) {
            console.log("עבר");
        } else {
            console.log("צריך תרגול נוסף");
        }
    },

    booleanLogic() {
        const age = 19;
        const hasTicket = true;
        const isBlocked = false;

        if (age >= 18 && hasTicket && !isBlocked) {
            console.log("אפשר להיכנס לאירוע");
        }

        const isWeekend = false;
        const isHoliday = true;

        if (isWeekend || isHoliday) {
            console.log("אין לימודים היום");
        }
    },

    logicGates() {
        const isLoggedIn = true;
        const isAdmin = false;
        const isEditor = true;
        const isBlocked = false;
        const hasPaid = true;

        const canEdit = isLoggedIn && (isAdmin || isEditor) && !isBlocked;
        const hasOnlyOneRole = isAdmin !== isEditor;
        const notAdminAndBlocked = !(isAdmin && isBlocked);
        const isGuest = !(isAdmin || isEditor);

        console.log("יכול לערוך:", canEdit);
        console.log("יש בדיוק תפקיד אחד:", hasOnlyOneRole);
        console.log("לא גם אדמין וגם חסום:", notAdminAndBlocked);
        console.log("אורח:", isGuest);
        console.log("יכול לקנות:", isLoggedIn && hasPaid && !isBlocked);
    },

    switchDemo() {
        const role = "admin";

        switch (role) {
            case "admin":
                console.log("גישה מלאה למערכת");
                break;
            case "editor":
                console.log("אפשר לערוך תוכן");
                break;
            case "viewer":
                console.log("אפשר לצפות בלבד");
                break;
            default:
                console.log("תפקיד לא מוכר");
        }
    },

    loopTypes() {
        for (let i = 1; i <= 3; i++) {
            console.log(`for: ${i}`);
        }

        let count = 1;
        while (count <= 3) {
            console.log(`while: ${count}`);
            count++;
        }

        let answer;
        do {
            answer = "yes";
            console.log("do...while רץ לפחות פעם אחת");
        } while (answer !== "yes");
    },

    forInOf() {
        const skills = ["HTML", "CSS", "JavaScript"];

        console.log("for...of על מערך:");
        for (const skill of skills) {
            console.log(`מיומנות: ${skill}`);
        }

        const user = {
            name: "נועה",
            role: "student",
            active: true
        };

        console.log("for...in על אובייקט:");
        for (const key in user) {
            console.log(`${key}: ${user[key]}`);
        }

        console.log("Object.entries() + for...of על אובייקט:");
        for (const [key, value] of Object.entries(user)) {
            console.log(`הערך של ${key} הוא ${value}`);
        }
    },

    breakContinue() {
        for (let i = 1; i <= 8; i++) {
            if (i === 3) {
                console.log("מדלגים על 3");
                continue;
            }

            if (i === 6) {
                console.log("עוצרים ב-6");
                break;
            }

            console.log(i);
        }
    },

    combinedLogic() {
        const numbers = [4, 9, 12, 15, 22, 30];
        let sum = 0;

        for (const number of numbers) {
            if (number % 3 === 0 && number % 2 === 0) {
                console.log(`${number} מתחלק גם ב-2 וגם ב-3`);
                sum += number;
            }
        }

        console.log("סכום:", sum);
    },

    nestedConditions() {
        const user = {
            isLoggedIn: true,
            role: "admin",
            hasTwoFactor: true
        };

        if (user.isLoggedIn) {
            if (user.role === "admin") {
                if (user.hasTwoFactor) {
                    console.log("כניסה מאושרת לאזור ניהול");
                } else {
                    console.log("צריך אימות דו שלבי");
                }
            } else {
                console.log("אין הרשאת ניהול");
            }
        } else {
            console.log("צריך להתחבר קודם");
        }
    },

    basic() {
        function sayHello() {
            console.log("שלום כיתה!");
            console.log("ברוכים הבאים לשיעור פונקציות");
        }

        sayHello();
        sayHello();
    },

    parameters() {
        function introduceStudent(name, age, grade) {
            console.log(`שם: ${name}`);
            console.log(`גיל: ${age}`);
            console.log(`ציון אחרון: ${grade}`);
        }

        introduceStudent("נועה", 16, 95);
        introduceStudent("דניאל", 17, 88);
    },

    return() {
        function calculateVat(price) {
            return price * 0.17;
        }

        function finalPrice(price) {
            return price + calculateVat(price);
        }

        const productPrice = 100;
        console.log("מע״מ:", calculateVat(productPrice));
        console.log("מחיר סופי:", finalPrice(productPrice));
    },

    types() {
        function add(a, b) {
            return a + b;
        }

        const multiply = function(a, b) {
            return a * b;
        };

        const divide = (a, b) => a / b;

        console.log("חיבור:", add(5, 3));
        console.log("כפל:", multiply(5, 3));
        console.log("חילוק:", divide(12, 3));
    },

    arrow() {
        const double = num => num * 2;
        const isAdult = age => age >= 18;
        const createMessage = name => `שלום ${name}, בהצלחה בשיעור!`;

        console.log(double(7));
        console.log(isAdult(20));
        console.log(createMessage("מאיה"));
    },

    conditions() {
        function isEven(num) {
            return num % 2 === 0;
        }

        for (let i = 1; i <= 10; i++) {
            if (isEven(i)) {
                console.log(`${i} הוא מספר זוגי`);
            }
        }
    },

    arrays() {
        function getPassingGrades(grades) {
            const passing = [];

            for (let i = 0; i < grades.length; i++) {
                if (grades[i] >= 60) {
                    passing.push(grades[i]);
                }
            }

            return passing;
        }

        console.log(getPassingGrades([100, 55, 78, 42, 91]));
    },

    objects() {
        function printUserCard(user) {
            console.log("----- כרטיס משתמש -----");
            console.log(`שם: ${user.name}`);
            console.log(`תפקיד: ${user.role}`);
            console.log(`פעיל: ${user.isActive ? "כן" : "לא"}`);
        }

        const user = {
            name: "אלכס",
            role: "Frontend Developer",
            isActive: true
        };

        printUserCard(user);
    },

    callback() {
        function runOperation(a, b, operation) {
            const result = operation(a, b);
            console.log(`התוצאה היא: ${result}`);
        }

        const add = (x, y) => x + y;
        const power = (x, y) => x ** y;

        runOperation(4, 3, add);
        runOperation(4, 3, power);
    },

    scope() {
        let globalMessage = "אני גלובלי";

        function showScope() {
            let localMessage = "אני מקומי";
            console.log(globalMessage);
            console.log(localMessage);
        }

        showScope();
        console.log("מחוץ לפונקציה אפשר להשתמש ב-globalMessage");
        console.log("localMessage קיים רק בתוך showScope");
    },

    blockScope() {
        const appName = "Grade App";

        function checkGrade(grade) {
            const message = "בודקים ציון";
            console.log(appName);
            console.log(message);

            if (grade >= 60) {
                const status = "עבר";
                console.log(status);
            }

            console.log("status לא זמין מחוץ לבלוק של ה-if");
        }

        checkGrade(88);
    },

    scopeChain() {
        const userName = "גלובלי";

        function outer() {
            const userName = "בתוך outer";

            function inner() {
                const userName = "בתוך inner";
                console.log(userName);
            }

            inner();
            console.log(userName);
        }

        outer();
        console.log(userName);
    },

    closure() {
        function createCounter() {
            let count = 0;

            return function() {
                count++;
                console.log(`הספירה עכשיו: ${count}`);
            };
        }

        const counter = createCounter();
        counter();
        counter();
        counter();
    },

    domConnect() {
        const inputValue = "נועה";
        const classList = ["message"];
        const messageText = `שלום ${inputValue}!`;

        console.log("1. תופסים input, button ו-p עם document.getElementById");
        console.log("2. בלחיצה קוראים את הערך מתוך input.value:", inputValue);
        console.log("3. מציגים את הערך בדף עם textContent:", messageText);

        classList.push("success");
        console.log("4. מוסיפים class של CSS עם classList.add:", classList.join(" "));
        console.log("5. ה-CSS של .message.success משנה את העיצוב בדף");
    },

    domOutput() {
        const inputValue = "נועה";
        const messageText = `שלום ${inputValue}, ברוכה הבאה!`;

        console.log("קוראים ערך מתוך input:", inputValue);
        console.log("כותבים את הערך לתוך p עם textContent");
        console.log(messageText);
    },

    domStyleClass() {
        const classList = ["card"];

        console.log("האלמנט התחיל עם class:", classList.join(" "));
        console.log('card.style.border = "3px solid teal"');

        classList.push("active");
        console.log("אחרי classList.add:", classList.join(" "));

        classList.push("highlight");
        console.log("אחרי classList.toggle:", classList.join(" "));
        console.log("בפרויקט אמיתי ה-CSS מגדיר איך active ו-highlight נראים");
    },

    calculatorDom() {
        function calculate(num1, num2, operator) {
            if (operator === "+") return num1 + num2;
            if (operator === "-") return num1 - num2;
            if (operator === "*") return num1 * num2;
            if (operator === "/") return num2 !== 0 ? num1 / num2 : "אי אפשר לחלק באפס";
            return "פעולה לא מוכרת";
        }

        const num1 = 10;
        const num2 = 5;

        console.log(`10 + 5 = ${calculate(num1, num2, "+")}`);
        console.log(`10 - 5 = ${calculate(num1, num2, "-")}`);
        console.log(`10 * 5 = ${calculate(num1, num2, "*")}`);
        console.log(`10 / 5 = ${calculate(num1, num2, "/")}`);
        console.log("בדף אמיתי התוצאה נכתבת לתוך #result עם textContent");
    },

    practice() {
        function getAverage(numbers) {
            let sum = 0;

            for (let i = 0; i < numbers.length; i++) {
                sum += numbers[i];
            }

            return sum / numbers.length;
        }

        function getStatus(average) {
            if (average >= 90) return "מצוין";
            if (average >= 75) return "טוב מאוד";
            if (average >= 60) return "עבר";
            return "צריך תרגול נוסף";
        }

        const grades = [80, 92, 71, 88];
        const average = getAverage(grades);

        console.log("ממוצע:", average);
        console.log("סטטוס:", getStatus(average));
    }
};

function runDemo(demoName) {
    const demo = demos[demoName];

    if (!demo) {
        return;
    }

    printToOutput(`output-${demoName}`, demo);
}

function toggleAnswer(answerId) {
    const answer = document.getElementById(`answer-${answerId}`);

    if (!answer) {
        return;
    }

    answer.classList.toggle("is-visible");
}

showSlide(0);
