function calculateAge() {
  const birthdate = document.getElementById("birthdate").value;

  if (!birthdate) {
    alert("Please select your birth date!");
    return;
  }

  const now = new Date();
  let birthDateTime = new Date(birthdate);

  // Calculate age
  const ageData = getDetailedAge(birthDateTime, now);

  // Display results
  displayResults(ageData, birthDateTime);
}

function getDetailedAge(birthDate, currentDate) {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();
  let hours = currentDate.getHours() - birthDate.getHours();
  let minutes = currentDate.getMinutes() - birthDate.getMinutes();
  let seconds = currentDate.getSeconds() - birthDate.getSeconds();

  // Adjust for negative values
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const daysInPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    days += daysInPrevMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calculate total values
  const totalDays = Math.floor(
    (currentDate - birthDate) / (1000 * 60 * 60 * 24)
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = Math.floor((currentDate - birthDate) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((currentDate - birthDate) / (1000 * 60));
  const totalSeconds = Math.floor((currentDate - birthDate) / 1000);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

function displayResults(ageData, birthDate) {
  const resultDiv = document.getElementById("result");
  const nextBirthday = getNextBirthday(birthDate);
  const zodiacSign = getZodiacSign(birthDate);
  const dayOfWeek = birthDate.toLocaleDateString("en-US", { weekday: "long" });

  resultDiv.innerHTML = `
                <div class="age-display">
                    You are ${ageData.years} years and ${
    ageData.months
  } months old!
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Next Birthday:</span>
                    <span class="detail-value">${nextBirthday}</span>
                </div>
                
                <div class="fun-facts">
                    <h3>📊 Fun Facts</h3>
                    <div class="fun-fact">🌟 You were born on a ${dayOfWeek}</div>
                    <div class="fun-fact">♈ Your zodiac sign is ${zodiacSign}</div>
                    <div class="fun-fact">💓 Your heart has beaten approximately ${Math.floor(
                      ageData.totalMinutes * 70
                    ).toLocaleString()} times</div>
                    <div class="fun-fact">😴 You've slept for about ${Math.floor(
                      ageData.totalDays / 3
                    )} days</div>
                    <div class="fun-fact">🌍 You've traveled ${Math.floor(
                      ageData.totalDays * 2.57
                    ).toLocaleString()} million kilometers around the sun</div>
                </div>
            `;

  resultDiv.classList.add("show");
}

function getNextBirthday(birthDate) {
  const now = new Date();
  const nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const daysUntil = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

  if (daysUntil === 0) {
    return "Today! 🎉";
  } else if (daysUntil === 1) {
    return "Tomorrow! 🎂";
  } else {
    return `In ${daysUntil} days`;
  }
}

function getZodiacSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const signs = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  for (let s of signs) {
    if (s.sign === "Capricorn") {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return s.sign;
      }
    } else {
      if (
        (month === s.start[0] && day >= s.start[1]) ||
        (month === s.end[0] && day <= s.end[1])
      ) {
        return s.sign;
      }
    }
  }

  return "Unknown";
}

// Set max date to today
document.getElementById("birthdate").max = new Date()
  .toISOString()
  .split("T")[0];
