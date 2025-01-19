// JSON-данные с расписанием
const scheduleData = [
    {
        id: 1,
        name: "Йога",
        time: "09:00 - 10:00",
        maxParticipants: 20,
        currentParticipants: 15
    },
    {
        id: 2,
        name: "Кардио тренировка",
        time: "10:30 - 11:30",
        maxParticipants: 25,
        currentParticipants: 25
    },
    {
        id: 3,
        name: "Силовая тренировка",
        time: "12:00 - 13:00",
        maxParticipants: 30,
        currentParticipants: 10
    }
];

const scheduleContainer = document.getElementById('schedule');

function createScheduleCard(session) {
    const isFull = session.currentParticipants >= session.maxParticipants;

    const card = document.createElement('div');
    card.className = 'col-md-4 schedule-card';
    card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${session.name}</h5>
                    <p class="card-text">Время: ${session.time}</p>
                    <p class="card-text">Участники: ${session.currentParticipants} / ${session.maxParticipants}</p>
                    <button class="btn btn-primary w-100" ${isFull ? 'disabled' : ''} data-action="enroll" data-id="${session.id}">
                        Записаться
                    </button>
                    <button class="btn btn-secondary w-100 mt-2" data-action="cancel" data-id="${session.id}">
                        Отменить запись
                    </button>
                </div>
            </div>
        `;
    return card;
}

function updateSchedule() {
    scheduleContainer.innerHTML = '';
    scheduleData.forEach(session => {
        const card = createScheduleCard(session);
        scheduleContainer.appendChild(card);
    });
}

function updateSession(id, action) {
    const session = scheduleData.find(item => item.id === id);

    if (!session) return;

    if (action === 'enroll' && session.currentParticipants < session.maxParticipants) {
        session.currentParticipants++;
    } else if (action === 'cancel' && session.currentParticipants > 0) {
        session.currentParticipants--;
    }

    updateSchedule();
}

scheduleContainer.addEventListener('click', (e) => {
    const button = e.target;
    const action = button.getAttribute('data-action');
    const id = parseInt(button.getAttribute('data-id'));

    if (action && id) {
        updateSession(id, action);
    }
});

updateSchedule();