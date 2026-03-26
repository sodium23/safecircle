from datetime import date

SCENARIOS = [
    {
        "id": 1,
        "situation": "You notice a rideshare driver takes a route different from the app while doors are child-locked.",
        "choices": {
            "A": "Ask once and stay quiet after.",
            "B": "Call a friend loudly, share live location, and ask to stop at a lit public place.",
            "C": "Wait until destination and report later.",
        },
        "outcomes": {
            "A": "May de-escalate, but you lose leverage if behavior continues.",
            "B": "Best immediate control move: creates witnesses and increases accountability.",
            "C": "Highest risk because you delay action while still in the vehicle.",
        },
        "power_move": "Use speakerphone + live location, then request drop-off at nearest busy gas station.",
    },
    {
        "id": 2,
        "situation": "At a party, someone keeps separating your friend from the group and blocking exits.",
        "choices": {
            "A": "Publicly confront the person immediately.",
            "B": "Create a reason to pull your friend away and leave together.",
            "C": "Assume your friend can handle it and watch from distance.",
        },
        "outcomes": {
            "A": "Can work, but may escalate before your friend is safely out.",
            "B": "Best tactical move: remove target first, then escalate with support if needed.",
            "C": "Danger grows while social pressure keeps your friend stuck.",
        },
        "power_move": "Physically regroup your friend with trusted people before any confrontation.",
    },
    {
        "id": 3,
        "situation": "You are walking home and realize the same person has followed for multiple blocks.",
        "choices": {
            "A": "Go straight home quickly.",
            "B": "Change direction toward a busy, staffed place and call someone.",
            "C": "Turn around and challenge the person alone.",
        },
        "outcomes": {
            "A": "Reveals your home location and can increase long-term risk.",
            "B": "Best risk reduction: witnesses, cameras, and support.",
            "C": "High volatility; confrontation can escalate unpredictably.",
        },
        "power_move": "Do not lead unknown person home; go public, lit, and monitored.",
    },
    {
        "id": 4,
        "situation": "Your drink was left unattended and someone insists you still drink it.",
        "choices": {
            "A": "Drink it to avoid awkwardness.",
            "B": "Discard it, get a new sealed drink, and stay with trusted people.",
            "C": "Smell/taste test first.",
        },
        "outcomes": {
            "A": "Highest risk; no social comfort is worth the medical danger.",
            "B": "Best safety move with minimal downside.",
            "C": "Unsafe; contamination is often undetectable.",
        },
        "power_move": "Normalize hard boundaries: unattended drink = automatic discard.",
    },
    {
        "id": 5,
        "situation": "A dating app match pressures you to change plans from café to private apartment first meet.",
        "choices": {
            "A": "Agree to avoid conflict.",
            "B": "Keep public-plan boundary or cancel.",
            "C": "Go but share location with one person only.",
        },
        "outcomes": {
            "A": "Increases isolation risk immediately.",
            "B": "Best filter: people who ignore boundaries self-select out.",
            "C": "Slightly better than A, but still puts you in a hard-to-exit setting.",
        },
        "power_move": "Boundary test early: respectful people accept public-first plans.",
    },
    {
        "id": 6,
        "situation": "Someone from work repeatedly waits near your car after late shifts.",
        "choices": {
            "A": "Ignore and hope it stops.",
            "B": "Document incidents, notify manager/security, and arrange escorted exits.",
            "C": "Confront alone in parking lot.",
        },
        "outcomes": {
            "A": "Pattern often continues without intervention.",
            "B": "Best legal/safety posture: creates records and immediate protective steps.",
            "C": "Can escalate in isolated area with few witnesses.",
        },
        "power_move": "Build a paper trail early; pattern evidence matters.",
    },
]


def get_today_scenario():
    """Rotate scenario by current day-of-month modulo list length."""
    day_of_month = date.today().day
    index = day_of_month % len(SCENARIOS)
    return SCENARIOS[index]
