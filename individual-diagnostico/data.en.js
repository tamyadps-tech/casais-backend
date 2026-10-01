// MIRROR — English version of Espelho. 100% static (runs entirely in the
// browser, no server, nothing saved anywhere beyond the device of whoever
// answers). Same scoring tags and structure as the Portuguese version —
// only the visible text is translated, so the two stay in sync logically.

const QUESTIONS = [
  // ---------- temperament ----------
  {
    id: 'TEM01', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Imagine you walk into a room full of people you don’t know. What moves inside you first?',
    opcoes: [
      { texto: 'An almost instinctive urge to start talking and light up the room', tag: 'sanguineo' },
      { texto: 'An impulse to quickly figure out who’s in charge and take a position', tag: 'colerico' },
      { texto: 'A watchful gaze, sizing up each person before deciding to approach', tag: 'melancolico' },
      { texto: 'A quiet calm, as if nothing in the room called for hurry', tag: 'fleumatico' },
      { texto: 'None of these — I’d rather watch from the sidelines, without fitting into any role', tag: 'neutro' },
      { texto: 'A bit of all of it, depending on who’s in the room', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM02', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'A plan you were genuinely looking forward to falls apart out of nowhere. What happens inside you first?',
    opcoes: [
      { texto: 'A spark of curiosity — I’m already thinking about what could come out of this', tag: 'sanguineo' },
      { texto: 'An instant irritation, and I’m already plotting how to fix it', tag: 'colerico' },
      { texto: 'A discomfort that keeps circling, replaying what went wrong', tag: 'melancolico' },
      { texto: 'An almost automatic acceptance — whatever comes, I absorb it', tag: 'fleumatico' },
      { texto: 'Barely anything — I don’t feel much difference between before and after', tag: 'neutro' },
      { texto: 'A silent grumble, and I go along with whatever life decided', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM03', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'In a group project where no one has decided who does what yet, which role do you end up taking without even noticing?',
    opcoes: [
      { texto: 'The one who lifts the group’s mood and keeps things from going flat', tag: 'sanguineo' },
      { texto: 'The one who takes the wheel and makes sure things actually happen', tag: 'colerico' },
      { texto: 'The one who notices the details everyone else would miss', tag: 'melancolico' },
      { texto: 'The one who holds things steady once everyone else has lost patience', tag: 'fleumatico' },
      { texto: 'The one who’s left with whatever nobody else wanted, no questions asked', tag: 'neutro' },
      { texto: 'The one who just does their own part, without mixing into the rest', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM04', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Someone cuts you off in traffic without asking. What crosses your mind in the first second?',
    opcoes: [
      { texto: 'A quick curse — gone before the next light', tag: 'sanguineo' },
      { texto: 'A hot flash of anger, almost itching for confrontation', tag: 'colerico' },
      { texto: 'An uncomfortable thought that keeps coming back for the rest of the drive', tag: 'melancolico' },
      { texto: 'Barely anything — the body doesn’t even really register it', tag: 'fleumatico' },
      { texto: 'I forget it the very next moment, as if it never happened', tag: 'neutro' },
      { texto: 'A tension that stays stuck inside, with nowhere to go', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM05', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Facing a decision that can’t wait, what guides your choice?',
    opcoes: [
      { texto: 'The impulse of the moment — I decide excited about the possibility opening up', tag: 'sanguineo' },
      { texto: 'The urge to get it done — I decide fast, no stalling', tag: 'colerico' },
      { texto: 'The need to turn the question over from every angle before acting', tag: 'melancolico' },
      { texto: 'The trust that time, on its own, sorts out what needs sorting', tag: 'fleumatico' },
      { texto: 'Seeking a second opinion before committing', tag: 'neutro' },
      { texto: 'Putting it off — I only decide when there’s no way around it', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM06', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'What wears down your patience in a relationship faster than anything else?',
    opcoes: [
      { texto: 'A routine that’s gone stale, with nothing new to live for', tag: 'sanguineo' },
      { texto: 'The feeling of having lost the reins of the situation', tag: 'colerico' },
      { texto: 'Not being able to read what’s behind the other person’s silence', tag: 'melancolico' },
      { texto: 'The confrontation itself — I’d take almost anything over an open fight', tag: 'fleumatico' },
      { texto: 'The lack of recognition for everything I’ve given', tag: 'neutro' },
      { texto: 'The feeling of having no voice in decisions that affect me', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM07', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'A serious problem shows up unannounced. What’s your first move, before you even start thinking?',
    opcoes: [
      { texto: 'Calling someone and getting it all out loud', tag: 'sanguineo' },
      { texto: 'Jumping straight into action — solving before feeling', tag: 'colerico' },
      { texto: 'Pulling inward and combing through every detail before any step', tag: 'melancolico' },
      { texto: 'Waiting, almost by instinct, to see if time sorts it out on its own', tag: 'fleumatico' },
      { texto: 'Gathering information, understanding the situation before any move', tag: 'neutro' },
      { texto: 'Distracting my mind first, putting off facing the problem', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM08', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'Someone compliments you in front of other people. What happens inside, before the reply even leaves your mouth?',
    opcoes: [
      { texto: 'An instant glow — I love moments like that', tag: 'sanguineo' },
      { texto: 'A quiet pride — I feel like I earned it', tag: 'colerico' },
      { texto: 'A subtle discomfort — I’d rather be recognized in private', tag: 'melancolico' },
      { texto: 'A simple gratitude, no big fuss', tag: 'fleumatico' },
      { texto: 'A suspicion — I start wondering if there’s an ulterior motive', tag: 'neutro' },
      { texto: 'An urge to return the compliment right away', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM09', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'If the way you live turned into a sentence, which of these would come closest?',
    opcoes: [
      { texto: '“Life’s a party, enjoy it before it’s gone”', tag: 'sanguineo' },
      { texto: '“If it’s not to win, why spend the energy?”', tag: 'colerico' },
      { texto: '“I’d rather do it right than do it fast”', tag: 'melancolico' },
      { texto: '“Slow and steady, and I’m in no rush”', tag: 'fleumatico' },
      { texto: '“Everyone in their own lane, no drama”', tag: 'neutro' },
      { texto: '“Whatever comes, I’ll deal with it — no big plan”', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM10', categoria: 'temperamento', tipo: 'multipla_escolha',
    texto: 'In the middle of an argument that really hurts, what does your body do before your mind decides anything?',
    opcoes: [
      { texto: 'Talks too much — words escape before I can filter them', tag: 'sanguineo' },
      { texto: 'Goes straight to the point, even knowing it might hurt', tag: 'colerico' },
      { texto: 'Shuts down, and only speaks again after processing everything in silence', tag: 'melancolico' },
      { texto: 'Avoids the confrontation, waits for the dust to settle on its own', tag: 'fleumatico' },
      { texto: 'Tries to balance — listening as much as speaking', tag: 'neutro' },
      { texto: 'Reaches for humor, tries to lighten the weight of the moment', tag: 'neutro' }
    ]
  },
  {
    id: 'TEM11', categoria: 'temperamento', tipo: 'escala',
    texto: 'On a scale of 1 to 5, how much does the feeling of losing control of a situation light something up inside you?',
    escala: { min: 1, max: 5, min_label: 'Barely anything — losing control doesn’t shake me', max_label: 'A lot — I feel like I explode inside when it happens' },
    dimensao: 'colerico'
  },
  {
    id: 'TEM12', categoria: 'temperamento', tipo: 'escala',
    texto: 'From 1 to 5, how much do you need to withdraw into silence before you can turn what you feel into words?',
    escala: { min: 1, max: 5, min_label: 'Not at all — the words come out the instant I feel them', max_label: 'A lot — I need time alone before I can name what I feel' },
    dimensao: 'melancolico'
  },

  // ---------- attachment ----------
  {
    id: 'APE01', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'The silence of your phone, after sending an important message, usually says what first in your head?',
    opcoes: [
      { texto: 'Nothing — the person must be busy, and that’s fine', tag: 'seguro' },
      { texto: 'An anxious whisper: did I do something wrong?', tag: 'ansioso' },
      { texto: 'Barely anything — I go on with my life without giving the silence any weight', tag: 'evitativo' },
      { texto: 'A confusing discomfort I can’t even name properly — fear? anger?', tag: 'desorganizado' },
      { texto: 'Depends on the day — sometimes I don’t even register it', tag: 'neutro' },
      { texto: 'A doubt that stays there, but never comes out', tag: 'neutro' }
    ]
  },
  {
    id: 'APE02', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'After a fight, what inside you most wants to happen first?',
    opcoes: [
      { texto: 'Talking it out soon, resolving it, and moving on — without carrying weight into the next day', tag: 'seguro' },
      { texto: 'Chasing reconciliation as soon as possible, even if I’m the one who gives in first', tag: 'ansioso' },
      { texto: 'Some time alone, away from the subject, before any conversation', tag: 'evitativo' },
      { texto: 'Part of me wants to get closer, another wants to disappear — both at once', tag: 'desorganizado' },
      { texto: 'Letting time do its work, without forcing anything more than necessary', tag: 'neutro' },
      { texto: 'Waiting — I feel bad, but I wait for the other person to make the first move', tag: 'neutro' }
    ]
  },
  {
    id: 'APE03', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Your partner announces a trip with friends, without you. What settles in your chest when you hear that?',
    opcoes: [
      { texto: 'A genuine calm — I trust, and enjoy my own time too', tag: 'seguro' },
      { texto: 'An anxiety that keeps imagining what they’re doing, nonstop', tag: 'ansioso' },
      { texto: 'A certain relief — I like my own space as much as they need theirs', tag: 'evitativo' },
      { texto: 'A longing mixed with a strange relief — both at the same time', tag: 'desorganizado' },
      { texto: 'Depends on the moment the relationship is going through', tag: 'neutro' },
      { texto: 'A relative peace, with the occasional text to check in', tag: 'neutro' }
    ]
  },
  {
    id: 'APE04', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'When the conversation turns to the relationship’s future — moving in together, building a life — what wakes up inside you?',
    opcoes: [
      { texto: 'A natural excitement, as if it were obvious to think about it together', tag: 'seguro' },
      { texto: 'An anxiety that searches for certainty — I need to know it’s really going to happen', tag: 'ansioso' },
      { texto: 'A subtle discomfort — I’d rather live one day at a time, without holding on to tomorrow', tag: 'evitativo' },
      { texto: 'A wish to go along that, the very next minute, turns into a wish to run from the subject', tag: 'desorganizado' },
      { texto: 'A stronger focus on the present, without dwelling too much on the future', tag: 'neutro' },
      { texto: 'Depends on how the conversation is handled — the tone, not the topic', tag: 'neutro' }
    ]
  },
  {
    id: 'APE05', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'When the person you love hurts you, even without meaning to, what comes up first?',
    opcoes: [
      { texto: 'A calm that manages to name what I felt, without getting lost along the way', tag: 'seguro' },
      { texto: 'A strong pressure, driven by the fear that it will happen again', tag: 'ansioso' },
      { texto: 'A silent retreat — I pull away without always explaining why', tag: 'evitativo' },
      { texto: 'An explosion that, minutes later, turns into regret over how I acted', tag: 'desorganizado' },
      { texto: 'Waiting for an apology before reacting at all', tag: 'neutro' },
      { texto: 'An attempt to understand the context before feeling anything', tag: 'neutro' }
    ]
  },
  {
    id: 'APE06', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'What, deep down, makes you feel like you can truly relax inside a relationship?',
    opcoes: [
      { texto: 'Knowing I can be exactly who I am, without having to perform', tag: 'seguro' },
      { texto: 'Having constant proof — words, gestures, attention — that I’m loved', tag: 'ansioso' },
      { texto: 'Keeping my independence intact, even while being with someone', tag: 'evitativo' },
      { texto: 'Honestly? I’ve never quite felt fully safe in a relationship', tag: 'desorganizado' },
      { texto: 'A stable routine, where I know what to expect', tag: 'neutro' },
      { texto: 'Feeling like we decide things as a team, not as separate individuals', tag: 'neutro' }
    ]
  },
  {
    id: 'APE07', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'When you realize you’re truly falling for someone, what does your body do before your mind decides anything?',
    opcoes: [
      { texto: 'Lets itself live it, naturally, without much resistance', tag: 'seguro' },
      { texto: 'Already starts fearing losing the person, even before really having them', tag: 'ansioso' },
      { texto: 'Puts up a subtle defense, afraid of exposing too much', tag: 'evitativo' },
      { texto: 'Moves closer and pulls back several times, without quite understanding its own motion', tag: 'desorganizado' },
      { texto: 'Watches cautiously before fully giving in', tag: 'neutro' },
      { texto: 'Goes with the flow, without thinking too much about what it’s feeling', tag: 'neutro' }
    ]
  },
  {
    id: 'APE08', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'At a party, your partner is laughing with someone else for longer than you’d like. What stirs in you?',
    opcoes: [
      { texto: 'Nothing too strong — I trust, and keep enjoying my own night', tag: 'seguro' },
      { texto: 'A jealousy that grows while I keep watching, unable to look away', tag: 'ansioso' },
      { texto: 'Barely anything — I don’t even notice, I’m distracted by something else', tag: 'evitativo' },
      { texto: 'A jealousy I feel inside but hide, to deal with later, some other time', tag: 'desorganizado' },
      { texto: 'An urge to join the conversation, no drama', tag: 'neutro' },
      { texto: 'A calm comment about it later, no weight to it', tag: 'neutro' }
    ]
  },
  {
    id: 'APE09', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Needing someone emotionally — for real, without pretending you can handle it alone — is something you...',
    opcoes: [
      { texto: 'Do naturally, understanding it’s part of any healthy bond', tag: 'seguro' },
      { texto: 'Seek intensely, sometimes even beyond what would be healthy', tag: 'ansioso' },
      { texto: 'Avoid as much as possible — I’d rather always find my own way', tag: 'evitativo' },
      { texto: 'Both desire and fear at once, in a contradiction that never fully resolves', tag: 'desorganizado' },
      { texto: 'Depends a lot on who’s on the other side', tag: 'neutro' },
      { texto: 'Try to balance between asking for help and figuring it out on your own', tag: 'neutro' }
    ]
  },
  {
    id: 'APE10', categoria: 'apego', tipo: 'multipla_escolha',
    texto: 'Good news lands in your life. Before telling anyone, what does your instinct do first?',
    opcoes: [
      { texto: 'Shares it right away, with your partner, with genuine joy', tag: 'seguro' },
      { texto: 'Shares it, already expecting a reaction big enough to confirm that you matter', tag: 'ansioso' },
      { texto: 'Keeps it to yourself for a while, before even thinking about telling anyone', tag: 'evitativo' },
      { texto: 'Tells it, but already bracing internally for some disappointment that might come later', tag: 'desorganizado' },
      { texto: 'Stays unsure whether to tell right away or wait for the right moment', tag: 'neutro' },
      { texto: 'Celebrates alone, before sharing it with anyone', tag: 'neutro' }
    ]
  },
  {
    id: 'APE11', categoria: 'apego', tipo: 'escala',
    texto: 'From 1 to 5, how much you need to feel, over and over, that you’re loved — even when nothing has actually changed.',
    escala: { min: 1, max: 5, min_label: 'Barely at all — I trust without needing constant proof', max_label: 'A lot — I need to feel it confirmed all the time' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE12', categoria: 'apego', tipo: 'escala',
    texto: 'From 1 to 5, how easily your rawest emotions can make it out of you and reach the person you love.',
    escala: { min: 1, max: 5, min_label: 'Almost never — I’d rather keep what I feel to myself', max_label: 'Easily — I open up without much resistance' },
    dimensao: 'evitativo', inverso: true
  },
  {
    id: 'APE13', categoria: 'apego', tipo: 'escala',
    texto: 'From 1 to 5, how much a relationship argument can invade your body — sleep, appetite, focus.',
    escala: { min: 1, max: 5, min_label: 'Not at all — I go on with my routine normally', max_label: 'A lot — I’m physically affected for days' },
    dimensao: 'ansioso'
  },
  {
    id: 'APE14', categoria: 'apego', tipo: 'escala',
    texto: 'From 1 to 5, how much you recognize in yourself this back-and-forth of getting close to people and pulling away, without really understanding why.',
    escala: { min: 1, max: 5, min_label: 'I never recognize this in myself', max_label: 'I recognize this in myself all too well' },
    dimensao: 'desorganizado'
  },

  // ---------- childhood wounds ----------
  {
    id: 'FER01', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Someone cancels on you at the last minute. Which pain, specifically, hurts the most?',
    opcoes: [
      { texto: 'The feeling of not having been a priority to that person', tag: 'rejeicao' },
      { texto: 'The fear that this becomes a pattern, until the person simply disappears', tag: 'abandono' },
      { texto: 'The feeling of becoming invisible, pushed to the background, weightless', tag: 'humilhacao' },
      { texto: 'The immediate suspicion about whether the excuse is even true', tag: 'traicao' },
      { texto: 'The frustration of having planned for nothing', tag: 'injustica' },
      { texto: 'Nothing too deep — just an annoyance in the day', tag: 'neutro' }
    ]
  },
  {
    id: 'FER02', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Negative feedback arrives. What really hurts isn’t the content — it’s what, exactly?',
    opcoes: [
      { texto: 'The fear of being rejected as a person, not just corrected on a task', tag: 'rejeicao' },
      { texto: 'The fear that this person will pull away from you because of it', tag: 'abandono' },
      { texto: 'The shame of feeling like everyone is watching your failure', tag: 'humilhacao' },
      { texto: 'The suspicion about the real intention behind those words', tag: 'traicao' },
      { texto: 'The feeling of being treated disproportionately for what you did', tag: 'injustica' },
      { texto: 'Nothing too deep — I move on quickly', tag: 'neutro' }
    ]
  },
  {
    id: 'FER03', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'In an argument, which of these phrases, if said, would leave the deepest mark on you?',
    opcoes: [
      { texto: '“I don’t want you around anymore”', tag: 'rejeicao' },
      { texto: '“I’m leaving”', tag: 'abandono' },
      { texto: '“You’re ridiculous for thinking that”', tag: 'humilhacao' },
      { texto: '“You’re not trustworthy”', tag: 'traicao' },
      { texto: '“You don’t deserve this”', tag: 'injustica' },
      { texto: 'No specific phrase — the tone of voice weighs more than the words', tag: 'neutro' }
    ]
  },
  {
    id: 'FER04', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Back to childhood: what weighed on you the most, silently, without anyone needing to say it out loud?',
    opcoes: [
      { texto: 'Not being picked first — for teams, for games, for attention', tag: 'rejeicao' },
      { texto: 'Spending a lot of time alone, without anyone truly close by', tag: 'abandono' },
      { texto: 'Being corrected in front of others, with everyone watching', tag: 'humilhacao' },
      { texto: 'Noticing that adults’ promises, often, weren’t kept', tag: 'traicao' },
      { texto: 'Feeling like the rules were different — and harsher — just for you', tag: 'injustica' },
      { texto: 'Nothing too remarkable — I had a peaceful childhood', tag: 'neutro' }
    ]
  },
  {
    id: 'FER05', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Being compared to someone else — even unintentionally — tends to open up which specific wound?',
    opcoes: [
      { texto: 'The feeling of not being enough just as you are', tag: 'rejeicao' },
      { texto: 'The fear of being traded for the person you were compared to', tag: 'abandono' },
      { texto: 'The shame of being exposed like that, in front of whoever’s there', tag: 'humilhacao' },
      { texto: 'The feeling that the person was hiding what they really thought of you', tag: 'traicao' },
      { texto: 'The plain frustration of finding it unnecessary and unfair', tag: 'injustica' },
      { texto: 'It doesn’t usually bother me much', tag: 'neutro' }
    ]
  },
  {
    id: 'FER06', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Finding out you were left out of an invitation or a group hits you how, inside?',
    opcoes: [
      { texto: 'It hurts a lot, even if I don’t show it', tag: 'rejeicao' },
      { texto: 'It lights up the fear of losing those people for good', tag: 'abandono' },
      { texto: 'It brings shame — even about asking why', tag: 'humilhacao' },
      { texto: 'It makes me start wondering who might have talked badly about me', tag: 'traicao' },
      { texto: 'It stirs up outrage — I just find it unfair', tag: 'injustica' },
      { texto: 'It doesn’t usually affect me much', tag: 'neutro' }
    ]
  },
  {
    id: 'FER07', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'In the idea of opening up completely to someone — no filter, no editing — what scares you most?',
    opcoes: [
      { texto: 'Being rejected after showing who you really are, no mask', tag: 'rejeicao' },
      { texto: 'Getting truly attached and then watching that person disappear', tag: 'abandono' },
      { texto: 'Seeming weak or ridiculous for feeling what you feel', tag: 'humilhacao' },
      { texto: 'That person using what you shared against you, later', tag: 'traicao' },
      { texto: 'I don’t usually fear that', tag: 'neutro' },
      { texto: 'Being misunderstood along the way', tag: 'neutro' }
    ]
  },
  {
    id: 'FER08', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'After making a big mistake, which fear weighs more than the mistake itself?',
    opcoes: [
      { texto: 'That people will stop liking you because of it', tag: 'rejeicao' },
      { texto: 'That it will push people away from you, little by little', tag: 'abandono' },
      { texto: 'The judgment — the shame of being seen messing up', tag: 'humilhacao' },
      { texto: 'That it will be used against you later, when you least expect it', tag: 'traicao' },
      { texto: 'Being punished disproportionately to the size of the mistake', tag: 'injustica' },
      { texto: 'I accept it and move on, without carrying much weight', tag: 'neutro' }
    ]
  },
  {
    id: 'FER09', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'Thinking about the scoldings you got as a kid: which of these phrases best describes how they were?',
    opcoes: [
      { texto: 'I felt like it was me, not just my behavior, that was being rejected', tag: 'rejeicao' },
      { texto: 'They came with silence or distance, not just words', tag: 'abandono' },
      { texto: 'They happened in front of other people, with no care about that', tag: 'humilhacao' },
      { texto: 'I felt like promises made before the scolding weren’t kept afterward', tag: 'traicao' },
      { texto: 'They seemed way too big for the small things I’d done', tag: 'injustica' },
      { texto: 'They were fair, and well explained — no lasting marks', tag: 'neutro' }
    ]
  },
  {
    id: 'FER10', categoria: 'feridas_infancia', tipo: 'multipla_escolha',
    texto: 'When someone breaks a promise to you, what exactly is at the center of the pain?',
    opcoes: [
      { texto: 'Feeling like you don’t matter enough for the promise to have been kept', tag: 'rejeicao' },
      { texto: 'The fear that it means, sooner or later, they’ll leave you', tag: 'abandono' },
      { texto: 'The shame of having believed, of having trusted too much', tag: 'humilhacao' },
      { texto: 'The breach of trust itself — the fact of it', tag: 'traicao' },
      { texto: 'The unfairness of having counted on something that simply never came', tag: 'injustica' },
      { texto: 'I move on — I don’t dwell on it', tag: 'neutro' }
    ]
  },
  {
    id: 'FER11', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'From 1 to 5, how much the fear of being abandoned by the people you love lives inside you, even on calm days.',
    escala: { min: 1, max: 5, min_label: 'Almost none — it’s not something that visits me', max_label: 'A lot — it’s a fear I feel almost always present' },
    dimensao: 'abandono'
  },
  {
    id: 'FER12', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'From 1 to 5, how much situations of unfairness — even small, everyday ones — can throw you off balance.',
    escala: { min: 1, max: 5, min_label: 'They barely affect me', max_label: 'They affect me deeply, and take a while to pass' },
    dimensao: 'injustica'
  },
  {
    id: 'FER13', categoria: 'feridas_infancia', tipo: 'escala',
    texto: 'From 1 to 5, how hard it is to truly trust someone, even when that person has never given you a reason not to.',
    escala: { min: 1, max: 5, min_label: 'I trust easily, without much effort', max_label: 'It’s very hard to truly trust, even without a reason' },
    dimensao: 'traicao'
  },

  // ---------- physical intimacy ----------
  {
    id: 'INT01', categoria: 'intimidade', tipo: 'multipla_escolha',
    texto: 'Talking openly about what brings you pleasure — or what doesn’t work for you — in intimacy with someone is something you:',
    opcoes: [
      { texto: 'Do naturally, without much filter — I’d rather say it than let the other person guess', tag: 'intimidade_livre' },
      { texto: 'Can do, but only once I truly feel safe with the person', tag: 'intimidade_criteriosa' },
      { texto: 'Find quite hard — I’d rather things just happen without having to put it into words', tag: 'intimidade_reservada' },
      { texto: 'Depends a lot on my emotional state in that moment, it varies a lot', tag: 'intimidade_oscilante' },
      { texto: 'I’ve never really stopped to think about it clearly', tag: 'neutro' }
    ]
  },
  {
    id: 'INT02', categoria: 'intimidade', tipo: 'multipla_escolha',
    texto: 'After an emotionally heavy day, what usually happens to your desire for physical intimacy?',
    opcoes: [
      { texto: 'Barely changes — desire and mood seem fairly independent of each other for me', tag: 'intimidade_livre' },
      { texto: 'Only really wakes up once I already feel cared for, heard, at peace', tag: 'intimidade_criteriosa' },
      { texto: 'Pretty much disappears — I get too shut down to even think about it', tag: 'intimidade_reservada' },
      { texto: 'Can go either way — sometimes it vanishes, sometimes it’s exactly what I reach for to unwind', tag: 'intimidade_oscilante' },
      { texto: 'I honestly can’t say for sure', tag: 'neutro' }
    ]
  },
  {
    id: 'INT03', categoria: 'intimidade', tipo: 'multipla_escolha',
    texto: 'Asking, in the moment, for what you actually want during intimacy is something that:',
    opcoes: [
      { texto: 'I do without much trouble — I know how to name what I want', tag: 'intimidade_livre' },
      { texto: 'I can do, but I prefer trust to already be well established first', tag: 'intimidade_criteriosa' },
      { texto: 'I find uncomfortable — I’d rather signal it in a more indirect way', tag: 'intimidade_reservada' },
      { texto: 'Varies a lot depending on how I’m feeling emotionally that day', tag: 'intimidade_oscilante' },
      { texto: 'I’ve never had that experience to know how to answer', tag: 'neutro' }
    ]
  },
  {
    id: 'INT04', categoria: 'intimidade', tipo: 'escala',
    texto: 'From 1 to 5, how much your desire for physical intimacy depends on feeling emotionally safe with the person, more than on any other factor.',
    escala: { min: 1, max: 5, min_label: 'Barely at all — desire and emotional safety run separately for me', max_label: 'A lot — without emotional safety, desire simply doesn’t show up' },
    dimensao: 'intimidade_criteriosa'
  },

  // ---------- emotional reactivity ----------
  {
    id: 'REA01', categoria: 'reatividade', tipo: 'multipla_escolha',
    texto: 'In the middle of an argument that’s heating up, what does your body do first, before your mind can think calmly?',
    opcoes: [
      { texto: 'Raises its volume, the defense comes fast and direct, almost automatic', tag: 'reage_na_hora' },
      { texto: 'The urge to physically leave that place is almost impossible to resist', tag: 'recua_na_hora' },
      { texto: 'Freezes up inside — the mind goes blank, the words just won’t come out', tag: 'trava_por_dentro' },
      { texto: 'I feel my body react, but I can still breathe and keep some control', tag: 'regula_rapido' },
      { texto: 'Depends a lot on who the other person in the argument is', tag: 'neutro' }
    ]
  },
  {
    id: 'REA02', categoria: 'reatividade', tipo: 'escala',
    texto: 'From 1 to 5, how much your heart races, your breathing changes, or your body heats up when an argument gets tense — even before any harsher word is said.',
    escala: { min: 1, max: 5, min_label: 'Barely at all — my body stays calm even in a tense argument', max_label: 'A lot — my body races before I can even think straight' },
    dimensao: 'reage_na_hora'
  },
  {
    id: 'REA03', categoria: 'reatividade', tipo: 'multipla_escolha',
    texto: 'After a moment of intense emotional stress, how long does your body usually take to return to normal?',
    opcoes: [
      { texto: 'Not long — I calm down fast, on my own', tag: 'regula_rapido' },
      { texto: 'I need a good amount of time alone, away from everything, to get back to normal', tag: 'recua_na_hora' },
      { texto: 'I keep stewing on it inside, even when I already look calm on the outside', tag: 'trava_por_dentro' },
      { texto: 'I only get back to normal after letting it out — talking loudly, crying, moving around', tag: 'reage_na_hora' },
      { texto: 'It varies a lot, I can’t really generalize', tag: 'neutro' }
    ]
  },
  {
    id: 'REA04', categoria: 'reatividade', tipo: 'escala',
    texto: 'From 1 to 5, how much you’re able to calm yourself down on your own, without needing the other person to do or say something first.',
    escala: { min: 1, max: 5, min_label: 'Barely at all — I need the other person to act first for me to calm down', max_label: 'A lot — I can regulate myself on my own, most of the time' },
    dimensao: 'regula_rapido'
  },

  // ---------- relationship with yourself ----------
  {
    id: 'EU01', categoria: 'individuo', tipo: 'multipla_escolha',
    texto: 'Being alone for a good while — no agenda, no commitments, nobody around — mostly stirs up, in you:',
    opcoes: [
      { texto: 'A genuine peace — I enjoy my own company, and it doesn’t feel like loneliness', tag: 'autonomia_solida' },
      { texto: 'A discomfort that only eases once I realize it’s temporary, not permanent', tag: 'em_construcao' },
      { texto: 'A relief that’s almost too big — sometimes I’d rather be alone than deal with someone', tag: 'isolamento_defensivo' },
      { texto: 'An emptiness that makes me want to fill my schedule as soon as possible', tag: 'busca_completude' },
      { texto: 'Depends a lot on the phase of life I’m in', tag: 'neutro' }
    ]
  },
  {
    id: 'EU02', categoria: 'individuo', tipo: 'multipla_escolha',
    texto: 'When you mess up badly, what’s the first voice that shows up in your head usually say?',
    opcoes: [
      { texto: 'Something kind, like "it’s okay to mess up, everyone does" — I move on without tearing myself apart', tag: 'autonomia_solida' },
      { texto: 'A harsh critic, which with conscious effort I manage to soften after a while', tag: 'em_construcao' },
      { texto: 'An urge to fix it alone and not let anyone see how big the mistake was', tag: 'isolamento_defensivo' },
      { texto: 'An almost urgent need for someone to tell me it’s still okay', tag: 'busca_completude' },
      { texto: 'It varies a lot depending on the mistake', tag: 'neutro' }
    ]
  },
  {
    id: 'EU03', categoria: 'individuo', tipo: 'multipla_escolha',
    texto: 'How much does your sense of personal worth change depending on whether you’re in a relationship right now?',
    opcoes: [
      { texto: 'Barely at all — my worth doesn’t depend on my relationship status', tag: 'autonomia_solida' },
      { texto: 'A little — I sometimes catch myself thinking about it, but I know how to keep the two separate', tag: 'em_construcao' },
      { texto: 'I’d rather not think about it at all — I just focus on myself and leave that subject aside', tag: 'isolamento_defensivo' },
      { texto: 'Quite a lot — being in a good relationship really changes how I feel about myself', tag: 'busca_completude' },
      { texto: 'I’d never honestly stopped to think about it', tag: 'neutro' }
    ]
  },
  {
    id: 'EU04', categoria: 'individuo', tipo: 'escala',
    texto: 'From 1 to 5, how much you’re able to keep being yourself — opinions, tastes, limits — even around someone you really want to please.',
    escala: { min: 1, max: 5, min_label: 'Barely at all — I lose myself trying to please', max_label: 'A lot — I stay myself, even when I really want to please' },
    dimensao: 'autonomia_solida'
  },

  // ---------- lifestyle (for compatibility guidance) ----------
  {
    id: 'EST01', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'When you picture your life a few years from now, how do children show up in that picture?',
    opcoes: [
      { texto: 'They show up clearly — I really want to be a parent, my heart’s already decided', tag: 'filhos_sim' },
      { texto: 'They show up as a real possibility, but without rush or urgency', tag: 'filhos_aberto' },
      { texto: 'They don’t show up — and I’m at peace with that', tag: 'filhos_nao' },
      { texto: 'They’re already part of my life, and I still want the family to grow more', tag: 'filhos_tem_quer_mais' },
      { texto: 'They’re already part of my life, and I feel my family is complete as it is', tag: 'filhos_tem_completo' },
      { texto: 'It’s still an open question inside me', tag: 'filhos_indeciso' }
    ]
  },
  {
    id: 'EST02', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'If you could design the vacation that truly recharges you, which scene would come to mind first?',
    opcoes: [
      { texto: 'A trail, an unfamiliar place, a challenge that pulls me out of the ordinary', tag: 'ferias_aventura' },
      { texto: 'A hammock, a beach, silence, and zero commitments', tag: 'ferias_descanso' },
      { texto: 'A museum, a new city to explore slowly and curiously', tag: 'ferias_cultura' },
      { texto: 'Close to home, surrounded by the people I love', tag: 'ferias_perto' },
      { texto: 'Anywhere — what really matters is the company', tag: 'ferias_flexivel' },
      { texto: 'Honestly, I’d rather save the money than spend it on travel', tag: 'ferias_economizar' }
    ]
  },
  {
    id: 'EST03', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Talking about money reveals something about each of us. Which sentence truly represents you?',
    opcoes: [
      { texto: 'I like to plan, save, have a cushion that gives me stability', tag: 'dinheiro_planejador' },
      { texto: 'I live more in the present — I spend on what makes me happy now', tag: 'dinheiro_presente' },
      { texto: 'This topic makes me uncomfortable, and I’d rather avoid it when I can', tag: 'dinheiro_desconfortavel' },
      { texto: 'I’m direct and transparent when it comes to money, no beating around the bush', tag: 'dinheiro_aberto' },
      { texto: 'I like investing, making my money work for me', tag: 'dinheiro_investidor' },
      { texto: 'I’m still learning to handle this well, no shame in admitting it', tag: 'dinheiro_aprendendo' }
    ]
  },
  {
    id: 'EST04', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Thinking about your family of origin, how much does physical closeness to them weigh in your life decisions?',
    opcoes: [
      { texto: 'A lot — I want to stay close always, it’s not negotiable for me', tag: 'familia_perto_essencial' },
      { texto: 'It matters, but I wouldn’t give up a good opportunity just for that', tag: 'familia_perto_flexivel' },
      { texto: 'Not much — I’d rather follow wherever life takes me', tag: 'familia_perto_baixo' },
      { texto: 'I already live far away, and I’ve made peace with that distance', tag: 'familia_longe_ok' },
      { texto: 'I’d rather live far away, by choice, not by circumstance', tag: 'familia_longe_opcao' },
      { texto: 'I’ve never really stopped to think about it', tag: 'familia_perto_indefinido' }
    ]
  },
  {
    id: 'EST05', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Between putting down deep roots in one place and living in constant motion, which one do you truly lean toward?',
    opcoes: [
      { texto: 'Roots — I like stability, routine, a well-built home', tag: 'estilo_fixo' },
      { texto: 'Motion — I like to move, discover, never tie myself down to one place', tag: 'estilo_viajante' },
      { texto: 'A balance — a fixed base, with frequent trips to breathe', tag: 'estilo_equilibrado' },
      { texto: 'Depends a lot on the stage of life I’m in', tag: 'estilo_depende' },
      { texto: 'I haven’t lived enough yet to honestly know what I prefer', tag: 'estilo_indefinido' },
      { texto: 'I’d like to travel more than my current reality allows', tag: 'estilo_deseja_viajar' }
    ]
  },
  {
    id: 'EST06', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 3,
    texto: 'If you could only pick three dreams to carry with you for the rest of your life, which would be on that list? (choose up to 3)',
    opcoes: [
      { texto: 'Building something that’s entirely mine — a business, a project of my own', tag: 'sonho_empreender' },
      { texto: 'Building a big, close-knit family, full of people who love each other', tag: 'sonho_familia' },
      { texto: 'Starting over in another country, another city, another version of myself', tag: 'sonho_morar_fora' },
      { texto: 'Reaching real financial stability and peace', tag: 'sonho_estabilidade' },
      { texto: 'Seeing the world with my own eyes, traveling as much as I can', tag: 'sonho_viajar' },
      { texto: 'Leaving a legacy — in art, work, or community — bigger than my own life', tag: 'sonho_legado' }
    ]
  },
  {
    id: 'EST07', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'If someone asked you today what role faith plays in your life, what would you answer without a second thought?',
    opcoes: [
      { texto: 'Central — I organize my routine, my decisions, around it', tag: 'fe_central' },
      { texto: 'Important, but lived in a personal way, without a fixed label', tag: 'fe_pessoal' },
      { texto: 'I deeply respect people who have faith, but it’s not something I practice', tag: 'fe_respeito' },
      { texto: 'It’s not part of my life today', tag: 'fe_nao' },
      { texto: 'I’m searching, without a settled answer yet', tag: 'fe_busca' },
      { texto: 'I’d rather not get into that', tag: 'fe_prefere_nao_falar' }
    ]
  },
  {
    id: 'EST08', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'A perfect Friday night, for you, looks more like what?',
    opcoes: [
      { texto: 'A club, a show, or a lively night out — loud music and people everywhere', tag: 'social_ama' },
      { texto: 'Dinner or happy hour with a group of friends — lively, but not over the top', tag: 'social_moderado' },
      { texto: 'A small dinner, or a good conversation, only with the people I really want to see', tag: 'social_intimo' },
      { texto: 'Staying home for a series marathon, a good book, or anything with zero commitment', tag: 'social_baixo' },
      { texto: 'A movie, a hike, a game, a hobby — I was never really the clubbing type anyway', tag: 'social_nao' },
      { texto: 'Depends entirely on who I’m with — the activity itself matters less', tag: 'social_depende' }
    ]
  },
  {
    id: 'EST09', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Deep down, does your body feel more at peace with structure or with spontaneity?',
    opcoes: [
      { texto: 'Structure — I like a plan, a schedule, predictability', tag: 'rotina_estruturado' },
      { texto: 'Spontaneity — I’d rather decide in the moment, no strings attached', tag: 'rotina_espontaneo' },
      { texto: 'A middle ground — some structure, with room for the unexpected', tag: 'rotina_equilibrado' },
      { texto: 'Depends a lot on the stage of life I’m in', tag: 'rotina_depende' },
      { texto: 'I’d like to have more structure than I have today', tag: 'rotina_deseja_mais' },
      { texto: 'I’d like to have less structure than I have today', tag: 'rotina_deseja_menos' }
    ]
  },
  {
    id: 'EST10', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 4,
    texto: 'In your free time — the kind nobody expects anything from you — what most brings you back to yourself? (choose up to 4)',
    opcoes: [
      { texto: 'An open book and the silence around it', tag: 'gosta_leitura' },
      { texto: 'The body in motion — sports, physical activity', tag: 'gosta_esportes' },
      { texto: 'Art, music, film — anything that moves me', tag: 'gosta_arte' },
      { texto: 'The outdoors, nature, open space', tag: 'gosta_natureza' },
      { texto: 'Technology, games, the digital world', tag: 'gosta_tecnologia' },
      { texto: 'Cooking, trying new flavors, creating in the kitchen', tag: 'gosta_gastronomia' }
    ]
  },
  {
    id: 'EST11', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Which of these sentences most honestly describes your relationship with reading today?',
    opcoes: [
      { texto: 'I read a lot — it’s a real part of my routine', tag: 'leitura_muita' },
      { texto: 'I read every now and then, when a book really calls to me', tag: 'leitura_as_vezes' },
      { texto: 'I prefer other formats — podcasts, video, audio — over actually reading', tag: 'leitura_outros_formatos' },
      { texto: 'It’s not a habit of mine today, but it’s something I’d like to build', tag: 'leitura_deseja' },
      { texto: 'I don’t really enjoy reading, and I’ve made peace with that', tag: 'leitura_nao' },
      { texto: 'I read a lot, but more out of necessity — work, study — than for pleasure', tag: 'leitura_funcional' }
    ]
  },
  {
    id: 'EST12', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 2,
    texto: 'What truly makes you feel loved, without a shadow of a doubt? (pick up to 2)',
    opcoes: [
      { texto: 'Words, spoken or written — a sincere compliment, an "I love you" said at the right time', tag: 'amor_palavras' },
      { texto: 'Real time, just the two of you, no phone, no rush', tag: 'amor_tempo' },
      { texto: 'A thoughtful little gift — not for its value, but for showing someone paid attention', tag: 'amor_presentes' },
      { texto: 'Everyday acts of care — someone handling something for me, without my having to ask', tag: 'amor_atos' },
      { texto: 'Physical touch — a hug, holding hands, being physically close', tag: 'amor_toque' }
    ]
  },
  {
    id: 'EST13', categoria: 'estilo_vida', tipo: 'selecao_multipla', max_selecoes: 2,
    texto: 'And what do you most naturally offer the people you love, almost without thinking? (pick up to 2)',
    opcoes: [
      { texto: 'Words — compliments, recognition, saying what I feel out loud', tag: 'amor_oferece_palavras' },
      { texto: 'Time — setting aside real moments just for the two of us', tag: 'amor_oferece_tempo' },
      { texto: 'Thoughtful little gifts, even small ones', tag: 'amor_oferece_presentes' },
      { texto: 'Actions — handling things for the person, caring in practical ways', tag: 'amor_oferece_atos' },
      { texto: 'Physical touch — hugging, affection, closeness', tag: 'amor_oferece_toque' }
    ]
  },
  {
    id: 'EST14', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Thinking about your relationship with money today, which sentence rings truest?',
    opcoes: [
      { texto: 'I’d rather not think about it much — money makes me uncomfortable, so I tend to avoid the subject', tag: 'dinheiro_evitador' },
      { texto: 'Money is a real measure of success — I like seeing my net worth grow and show for itself', tag: 'dinheiro_status' },
      { texto: 'More money would always solve a good chunk of my problems — it’s almost a quiet obsession', tag: 'dinheiro_idolatra' },
      { texto: 'I stay constantly on alert about spending, even when I’m financially fine — it never feels like enough to feel secure', tag: 'dinheiro_vigilante' },
      { texto: 'I have a calm, balanced relationship with money, without much drama', tag: 'neutro' }
    ]
  },
  {
    id: 'EST15', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'When money comes up in a relationship, your style tends more toward:',
    opcoes: [
      { texto: 'Talking openly about how much I earn, spend, and save, without hedging or shame', tag: 'dinheiro_transparente' },
      { texto: 'Preferring to keep some financial things to myself, even in a serious relationship', tag: 'dinheiro_reservado' },
      { texto: 'Letting the subject sort itself out, without much direct conversation about it', tag: 'dinheiro_evasivo' },
      { texto: 'Wanting to keep control of the couple’s financial decisions, even without quite realizing it', tag: 'dinheiro_controlador' },
      { texto: 'I haven’t lived that enough yet to know my own style', tag: 'neutro' }
    ]
  },
  {
    id: 'EST16', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'If you could freely choose, with absolutely no commitment tying you to any schedule, what time would your body actually choose to wake up and go to sleep?',
    opcoes: [
      { texto: 'Early, naturally — I wake up ready and already feel my energy peak in the morning', tag: 'cronotipo_matutino' },
      { texto: 'Late, naturally — my best energy and clarity come at night, even into the early hours', tag: 'cronotipo_vespertino' },
      { texto: 'A comfortable middle ground, without a strong preference for either extreme', tag: 'cronotipo_intermediario' },
      { texto: 'It varies quite a bit depending on the phase, accumulated sleep, time of year', tag: 'cronotipo_variavel' },
      { texto: 'I’ve never really paid attention to that', tag: 'neutro' }
    ]
  },
  {
    id: 'EST17', categoria: 'estilo_vida', tipo: 'multipla_escolha',
    texto: 'Being forced to function outside your natural schedule (waking up very early as a night owl, for example) usually costs you:',
    opcoes: [
      { texto: 'Barely anything — I adapt easily to almost any schedule', tag: 'rotina_adaptavel' },
      { texto: 'Quite a lot — I get visibly more irritable, tired, or scattered during those periods', tag: 'rotina_sensivel_ritmo' },
      { texto: 'It only lasts for a while — my body adjusts after a few days', tag: 'rotina_ajuste_gradual' },
      { texto: 'I’d rather not put myself in that situation when I have a choice', tag: 'rotina_protege_ritmo' },
      { texto: 'I’ve never gone through that in any noticeable way', tag: 'neutro' }
    ]
  }
];

// Universal "skip without guessing" option, same as the couples app —
// avoids every multiple-choice/select question needing its own escape
// hatch. Injected automatically here instead of repeated per question.
const NAO_SEI_TEXTO = 'I don’t know / doesn’t apply';
QUESTIONS.forEach((q) => {
  if (q.tipo === 'multipla_escolha' || q.tipo === 'selecao_multipla') {
    q.opcoes.push({ texto: NAO_SEI_TEXTO, tag: 'neutro' });
  }
});

// ---------- "ideal partner" — behavioral compatibility only ----------
// Each lifestyle tag (EST01-11) points to a sentence describing a trait
// of someone who tends to fit well, day to day, with someone of that
// profile. This is NOT deep/emotional compatibility — just lifestyle
// and behavior (see the intro text of that section).
const TAG_TO_PARCEIRO_IDEAL = {
  filhos_sim: 'also wants to be a parent, or is at least genuinely open to that possibility — a dream like that can’t be multiplied alone',
  filhos_aberto: 'doesn’t treat the topic of kids as an ultimatum, and is willing to build that decision together, in due time',
  filhos_nao: 'also doesn’t want children, or at least deeply respects that the choice remains yours',
  filhos_tem_quer_mais: 'wholeheartedly embraces the children you already have and also wants the family to grow',
  filhos_tem_completo: 'understands and celebrates that your family, as it is, is already complete',
  filhos_indeciso: 'has patience for that decision to mature together, without pushing either way',

  ferias_aventura: 'is willing to step out of the comfort zone with you, without needing guaranteed comfort at all times',
  ferias_descanso: 'truly knows how to slow down at your side, without turning every break into a marathon of sightseeing',
  ferias_cultura: 'loves learning and being charmed by new places just as much as you do',
  ferias_perto: 'values the same simple moments close to the people you both love',
  ferias_flexivel: 'doesn’t make the destination a problem — what matters to them too is the company',
  ferias_economizar: 'shares your priority for financial stability, even when that means passing on a trip',

  dinheiro_planejador: 'also values planning and financial security, without treating it as coldness',
  dinheiro_presente: 'understands your lighter approach to money without judging you for it',
  dinheiro_desconfortavel: 'has the patience to build, together with you, the courage to talk about this subject',
  dinheiro_aberto: 'is also able to be direct and transparent about money, no beating around the bush and no shame',
  dinheiro_investidor: 'shares your interest in making the couple’s money grow, responsibly',
  dinheiro_aprendendo: 'is willing to learn this together with you, with no pressure',

  familia_perto_essencial: 'understands and values how much your family of origin matters to you',
  familia_perto_flexivel: 'can balance, with you, closeness to family and whatever opportunities life brings',
  familia_perto_baixo: 'doesn’t make family distance a problem, and supports wherever life takes you both',
  familia_longe_ok: 'is at peace with physical distance from family, just like you',
  familia_longe_opcao: 'understands that this is a conscious choice of yours, not a loss to be mourned',
  familia_perto_indefinido: 'has patience for that answer to mature over time, together',

  estilo_fixo: 'also values roots, stability, and a well-built home',
  estilo_viajante: 'shares that urge to move, to not tie yourself down to one place',
  estilo_equilibrado: 'seeks that same balance between having a base and living new things',
  estilo_depende: 'can adapt with you, stage by stage, without rigidity',
  estilo_indefinido: 'is willing to figure that out by your side, without rushing',
  estilo_deseja_viajar: 'understands that pent-up desire and helps make room for it, whenever possible',

  sonho_empreender: 'supports (or shares) your drive to build something of your own',
  sonho_familia: 'also dreams of a big, close-knit family, and genuinely invests in it',
  sonho_morar_fora: 'is open to the idea of starting over somewhere else with you',
  sonho_estabilidade: 'values peace and stability just as much as you do',
  sonho_viajar: 'has that same appetite for seeing the world',
  sonho_legado: 'understands the importance of leaving something bigger than the present, and helps you build it',

  fe_central: 'shares or deeply respects the central place faith holds in your life',
  fe_pessoal: 'understands your more personal spirituality, without needing it to fit a fixed mold',
  fe_respeito: 'treats your faith (or the lack of it) with genuine respect, without trying to convert you to anything',
  fe_nao: 'doesn’t turn faith into a point of pressure or expectation in the relationship',
  fe_busca: 'has the patience to walk with you while that search is still open',
  fe_prefere_nao_falar: 'respects that boundary, without pushing the conversation before its time',

  social_ama: 'loves going out and enjoying a social life just as much as you do',
  social_moderado: 'is willing to balance, with you, the party moments and the calm ones',
  social_intimo: 'prefers, like you, small and genuine gatherings over big commotion',
  social_baixo: 'enjoys a quieter, more homebody night just as much as you do, without expecting a busy social life',
  social_nao: 'has their own favorite activities that match yours',
  social_depende: 'understands that company matters more than the activity itself, just like you',

  rotina_estruturado: 'also feels good with a plan and predictability, without finding it boring',
  rotina_espontaneo: 'likes deciding in the moment just as much as you do, without feeling lost without a script',
  rotina_equilibrado: 'seeks that same middle ground between structure and spontaneity',
  rotina_depende: 'adapts with you, without demanding too fixed a routine',
  rotina_deseja_mais: 'helps you build more structure, without treating it as a weakness of yours',
  rotina_deseja_menos: 'helps you loosen your grip a little, without judging that wish',

  gosta_leitura: 'values — or at least truly respects — your time with a book',
  gosta_esportes: 'is willing to move with you, or at least genuinely cheers on your physical achievements',
  gosta_arte: 'is moved by art, music, or film the way you are',
  gosta_natureza: 'loves the outdoors and nature just as much as you do',
  gosta_tecnologia: 'understands your interest in technology and games, without seeing it as a waste of time',
  gosta_gastronomia: 'shares, or genuinely appreciates, your love for cooking and food',

  leitura_muita: 'values, and maybe even shares, your steady reading habit',
  leitura_as_vezes: 'respects your reading pace, without expecting more than what you already do for pleasure',
  leitura_outros_formatos: 'understands that learning can come in many forms, not just from books',
  leitura_deseja: 'encourages you to build that habit, with no rush and no pressure',
  leitura_nao: 'doesn’t make reading a measure of worth — accepts you as you are',
  leitura_funcional: 'understands that your reading serves a practical purpose, and values that too',

  amor_palavras: 'expresses love in words, not just inside — compliments, acknowledges, says what they feel out loud',
  amor_tempo: 'sets aside real time for the two of you, without letting the rush swallow those moments',
  amor_presentes: 'pays attention to the details that make you happy, even in the small thoughtful gifts',
  amor_atos: 'shows care through concrete action, handling things for you without being asked',
  amor_toque: 'seeks physical touch naturally, without you having to ask',

  amor_oferece_palavras: 'knows how to recognize and value it when you express affection in words — that’s no small thing for someone who offers that kind of care',
  amor_oferece_tempo: 'genuinely values the time you set aside for them, without treating it as a given',
  amor_oferece_presentes: 'recognizes the intention behind every thoughtful little gift you offer, even the small ones',
  amor_oferece_atos: 'notices and appreciates the practical care you offer day to day, without taking it for granted',
  amor_oferece_toque: 'receives well the physical touch you naturally offer, without finding that closeness strange',

  dinheiro_evitador: 'has patience to build, with you, little by little, the courage to talk about money without discomfort',
  dinheiro_status: 'understands your relationship between money and achievement, without judging it as superficial',
  dinheiro_idolatra: 'helps bring a bit of grounding to financial anxiety, without minimizing what you feel',
  dinheiro_vigilante: 'has patience with your financial vigilance, even when the numbers already show security',
  dinheiro_transparente: 'also values full openness about money, without keeping financial secrets',
  dinheiro_reservado: 'respects your space of financial autonomy, even while sharing a life together',
  dinheiro_evasivo: 'is willing to gently bring up the money conversations you tend to avoid',
  dinheiro_controlador: 'knows how to balance with you who decides what, without financial control becoming a blind spot',

  cronotipo_matutino: 'doesn’t mind (or shares) your early-morning energy, even if it means going to bed early too',
  cronotipo_vespertino: 'respects your later energy peak, without expecting you to fake being a morning person',
  cronotipo_intermediario: 'adjusts easily to your more flexible rhythm of schedules',
  cronotipo_variavel: 'has patience with the shifts in your internal clock, without demanding too fixed a routine',
  rotina_adaptavel: 'doesn’t have to worry about perfectly matching schedules with you — you adapt easily',
  rotina_sensivel_ritmo: 'respects how much it costs you to go against your natural rhythm, and avoids demanding it without real need',
  rotina_ajuste_gradual: 'has patience during the days your body is still adjusting to a schedule change',
  rotina_protege_ritmo: 'understands and supports you when you choose to protect your natural rhythm, instead of forcing an unnecessary adjustment'
};

// ---------- result text blocks (assembled by combination) ----------

const TEMPERAMENTO_BLOCKS = {
  sanguineo: 'You carry an energy that’s contagious — you walk into a room and the mood shifts. That’s not luck, it’s temperament: within personality psychology, psychologist Hans Eysenck and, later, psychiatrist Robert Cloninger described this kind of profile as linked to a high sensitivity to reward and novelty — a nervous system that lights up easily around anything new, including new people. Twin studies show that a good part of this tendency (somewhere between 40% and 60%, depending on the trait measured) has a biological basis, not just upbringing or choice. In relationships, this makes you someone easy to fall for early on — fun, spontaneous, no half-measures. The thing to watch is consistency: the same enthusiasm that gets you starting a thousand things can also make you disappear before they bear fruit, including in hard conversations that need repetition, not just a single moment of courage. Your strength isn’t staying serious all the time — it’s learning to keep the flame lit even after the novelty has worn off.',
  colerico: 'You decide fast, say what you think, and have no patience for beating around the bush — that’s rare and valuable, especially when someone needs clarity in the middle of chaos. In the temperament literature, this profile tends to show up as high energy combined with low tolerance for frustration: Eysenck would call it a trait of high arousal, and Cloninger would describe it as high novelty-seeking with low behavioral inhibition — the brake is there, it just takes a moment to kick in. You’re probably the person others turn to when something really needs to get done. In relationships, that same strength can weigh heavy: your bluntness, said too fast or in the heat of the moment, can come across as harshness to someone who just wanted to be heard, not corrected. It’s not about being less direct — it’s about choosing the right moment to say what needs to be said.',
  melancolico: 'You feel deeply, think deeply, and notice details most people walk right past. Psychologist Jerome Kagan, in one of the most cited longitudinal studies on temperament, followed children from infancy and described a “highly reactive” group — more sensitive to novelty, more prone to caution and introspection — and showed that this trait tends to persist, with adjustments, into adulthood. That depth is a rare gift in an age that prizes speed and surface — you love in layers, not in clichés. The risk is introspection turning into isolation: processing so much internally that whoever’s on the outside never knows what’s going on, and reads your silence as distance rather than care. Your task isn’t to feel less — it’s to learn to share the process, not just the conclusion.',
  fleumatico: 'You’re the kind of person who stabilizes the room just by being in it — calm, patient, hard to rattle. It’s almost the mirror image of the “low reactivity” profile the same Jerome Kagan described in his research: a nervous system that reacts little to new stimuli and bounces back quickly after any jolt. That’s rare, and the people around you feel that steady ground, even without being able to name it. The flip side of that calm is passivity: avoiding every bit of friction can mean your own needs always end up last, until one day they overflow in a way that surprises even you. Your peace doesn’t have to turn into silence — you can speak up with the same calm you already bring to everything else.'
};

// Temperament "volume" — how much the dominant tendency stood out on
// its own vs. shared space with other styles in the answers.
const TEMPERAMENTO_VOLUME_BLOCKS = {
  alto: 'One thing worth pointing out about the volume of this trait: it didn’t show up on its own by chance — it came through noticeably stronger than the other tendencies in your answers. That usually means this is the volume you live in most of the time, not just an occasional reaction on bad days. It’s worth getting to know this volume well, because it’s probably the one the people closest to you recognize first.',
  moderado: 'About the volume of this trait: it showed up with moderate strength in your answers — present and real, but sharing space with other ways of reacting. That suggests some flexibility: depending on the context, who’s around, or how tired you are, other sides of you show up strongly too.',
  sutil: 'About the volume of this trait: in your answers, no single temperament stood out strongly — your profile looks more like a balanced mix of styles than one single dominant trait. That’s not indecision: it usually means you adapt a lot to context, pulling out whichever style the situation calls for.'
};

const APEGO_BLOCKS = {
  seguro: 'Psychiatrist John Bowlby, the founder of attachment theory, described how our earliest bonds build what he called an “internal working model” — a kind of unconscious map of how we expect love to work. Your map, it seems, was drawn on solid ground: you trust naturally, communicate without drama, and handle distance from your partner without panicking. That doesn’t mean you never get hurt — it means you recover without needing a crisis. It’s one of the most valuable assets anyone can bring into a relationship, and you probably don’t even realize how rare it is.',
  ansioso: 'Bowlby and, decades later, psychologist Mary Ainsworth, mapped out a pattern that repeats: when care in childhood was inconsistent — present sometimes, absent other times, unpredictable — the child learns to stay on alert, watching for signs that the bond could disappear at any moment. That alarm doesn’t switch off in adulthood. It shows up as the vigilance you feel when a message takes too long, as the need for reassurance that can sometimes feel like too much to the person on the other end. It’s not neediness — it’s an alarm system trained too early, in a time when you had no choice. And alarm systems can be recalibrated, with awareness and practice.',
  evitativo: 'There’s an attachment pattern, well described in the tradition that comes from Bowlby, where a child learns — often in a home where asking for comfort didn’t bring comfort — that the safest way to avoid disappointment is to never need anyone enough for it to hurt. That gave you a real, almost admirable independence. The cost is that letting go of it, even with someone you love, can feel dangerous, even when it isn’t. Intimacy isn’t your enemy — it’s just territory your body still treats as risky, out of old habit, not current choice.',
  desorganizado: 'This is the most studied attachment pattern today, because it’s the most contradictory on the inside: part of you seeks closeness with everything you’ve got, and another part runs from it with the same intensity, almost at the same time. Research building on Bowlby and continued by scholars like Mary Main shows this usually arises when the very person who was supposed to be a source of safety was also, at some point, a source of fear — even without meaning to be. It’s not a flaw in character. It’s a nervous system that learned two opposite messages at once and is still trying to decide which one is true.'
};

const FERIDA_BLOCKS = {
  rejeicao: 'Physician Gabor Maté likes to say that trauma isn’t what happened to you — it’s what happened inside you, in the absence of someone who could help you process it. If the wound of rejection speaks loudest in your story, it’s likely that, at some point — maybe with a parent physically present but emotionally distant, or too unavailable to validate who you really were — you concluded, early on, that you needed to be different than you were in order to be accepted. That may have made you, perhaps, a fine reader of other people’s expectations — and tired of trying to live up to them. The cure isn’t to stop caring what others think. It’s to stop deciding your worth based on it.',
  abandono: 'When the presence of someone important — through physical absence, emotional absence, or the unpredictability of being there sometimes and not others — wasn’t constant in childhood, the body learns a lesson that’s hard to unlearn: that loving is, sooner or later, losing. That may explain why you hold on so tightly, why the other side’s silence weighs so much more than it should on an ordinary day. It’s not weakness — it’s a well-trained protective system, one that today reacts to small signals as if they were the big signal from before. Neuroscience calls this predictive learning: the brain uses the past to predict the future, even when the present has already changed.',
  humilhacao: 'If what hurts you most is judgment, exposure, feeling small in front of others, it’s worth asking: was there, in your story, public corrections, constant comparisons, an adult who taught through shame instead of through example? Psychiatrist and trauma researcher Bessel van der Kolk describes, in his work on how the body keeps the record of what we live through, that repeated childhood shame leaves a physical mark, not just an emotional one — a way of literally shrinking in the face of judgment. You’re not overly sensitive. You were taught, early on, to fear being fully seen.',
  traicao: 'Trusting fully, even when no one has given you a reason not to, can feel impossible if, at some point in your story, a promise that should have been kept — from a parent, from whoever was supposed to be reliable — simply wasn’t. It doesn’t have to have been one dramatic event; sometimes it’s the sum of small broken words that, together, taught a pattern: what’s said isn’t always what happens. Today it shows up as a suspicion that arrives before reason does, testing the loyalty of people who may never have given you a reason for it. Trust broken early can be rebuilt — just not overnight, and not alone.',
  injustica: 'If small unfairnesses affect you far more deeply than they seem to affect others, maybe, in your story, rules were applied unevenly — to you, or between you and someone closer to an important adult. A child who lives through that develops a hypersensitive radar for disproportion, for unfair treatment, for feeling like they’re always paying more than they should. That radar is, often, accurate — your sense of unfairness tends to be real. What’s worth training isn’t turning off that sensitivity, but calibrating the size of the response to the size of the actual problem, without letting an old unfairness answer in place of the current one.'
};

const INTIMIDADE_BLOCKS = {
  intimidade_livre: 'You talk about desire, about pleasure, about what works and what doesn’t, without treating it as forbidden ground. Researcher Emily Nagoski, author of one of the most cited studies on sexual response, describes desire as the result of a balance between an "accelerator" (what turns desire on) and "brakes" (what turns it off) — and being able to name both out loud makes it far more likely you’ll build intimacy that actually works for both people. Your challenge isn’t learning to open up — it’s remembering that not everyone arrives with that same ease, and that patience with a more sensitive brake makes all the difference.',
  intimidade_criteriosa: 'Your desire doesn’t switch on automatically — it asks for emotional safety first, and that’s not coldness, nor lack of desire: it’s one of the most common "brakes" that researcher Emily Nagoski describes in what’s known as the dual control model of sexual response. For you, physical and emotional intimacy walk together almost always. It’s worth naming this to whoever you love, instead of waiting for them to guess — because from the outside, this need can look like rejection, when really it’s just your way of needing solid ground before giving yourself over.',
  intimidade_reservada: 'Putting desire into words, asking for what you want, saying what isn’t working — all of that asks for a vulnerability you still treat as risky territory. It’s not a lack of desire: it’s discomfort naming it, which is quite different. Therapist Esther Perel often says eroticism requires some degree of risk — and putting into words what we want is, in fact, a real risk, of being judged or misunderstood. It’s worth starting small: naming just one thing, once, to someone you trust — vulnerability gets lighter with practice, not with one single dose of courage.',
  intimidade_oscilante: 'Your desire doesn’t follow a fixed pattern — it shifts with your emotional state, with the day, with how safe you feel in that specific moment. This also fits Emily Nagoski’s "accelerator and brakes" model: your brakes seem more sensitive to context than other people’s, which means external factors (stress, a recent fight, exhaustion) weigh more heavily on your response than they would for someone with a steadier system. It isn’t instability of character — it’s a response system more reactive to the environment. It’s worth communicating this, instead of letting the shift be read as disinterest.'
};

const REATIVIDADE_BLOCKS = {
  reage_na_hora: 'When tension rises, your body kicks into action before your mind can slow it down — this is what researcher John Gottman, in one of the most cited studies on couples, calls "flooding": the heart races, usually above 100 beats per minute, and in that state the rational brain loses some of its ability to process calmly. Reacting fast isn’t a lack of control — it’s physiology happening faster than reflection. The practice here isn’t to feel less intensely, it’s to recognize the body’s signal early enough to ask for a pause before it takes over everything.',
  recua_na_hora: 'Faced with tension, your body asks for physical distance — leaving the room, stepping back, gaining space before continuing. Within the polyvagal theory of researcher Stephen Porges, this resembles what’s called a flight response: the nervous system decides safety lies in putting distance between you and the source of stress. It isn’t weakness or disinterest in the conversation — it’s a legitimate form of regulation. The thing to watch is giving notice before disappearing: "I need some time, I’ll be back" completely changes how the person left behind feels about your leaving.',
  trava_por_dentro: 'In moments of high tension, your mind seems to go blank — the words disappear, the body freezes, and on the outside you might even look calm, while inside everything is happening at once. In Stephen Porges’ polyvagal theory, this is the freeze pattern — a state in which the nervous system decides neither fighting nor fleeing is safe, and the response becomes stillness. It’s real, not coldness or disinterest. It’s worth naming it to whoever is with you, even afterward: "I froze, it wasn’t that I stopped caring" helps the other person not read your silence as an absence of feeling.',
  regula_rapido: 'Your body does react to tension — that’s human, it happens to everyone — but you’re able to breathe, think, and return to balance without needing much time or outside intervention. That’s a sign of good self-regulation capacity — the ability, widely described in the literature on emotional regulation, to calm down without depending entirely on the environment or the other person. That’s a valuable resource in a relationship: you can be the anchor in the more turbulent moments, as long as it doesn’t become your job alone to calm both of you down.'
};

const INDIVIDUO_BLOCKS = {
  autonomia_solida: 'You seem to have what pediatrician and psychoanalyst Donald Winnicott called the "capacity to be alone" — not isolation, but the ability to be in your own company without feeling incomplete or abandoned. Winnicott saw this as one of the clearest signs of emotional maturity: only someone who doesn’t depend on connection to feel whole can truly connect with another person. Psychiatrist Murray Bowen called something similar "differentiation of self" — the capacity to hold onto your own identity even in intense emotional closeness with someone. You already carry a solid base of that. The thing to watch is not letting that autonomy become armor against truly letting someone in.',
  em_construcao: 'Your sense of worth and your ability to be okay alone still waver — sometimes they come easily, sometimes they take conscious effort to hold steady. That isn’t weakness, it’s process: psychiatrist Murray Bowen described "differentiation of self" — the capacity to hold your own identity even close to someone important — as something that develops over a lifetime, not a fixed trait you’re born with. You’re apparently somewhere in the middle of that path: you already know how to notice when you lose a bit of yourself, and you can already, with some effort, come back. That awareness is already half the work.',
  isolamento_defensivo: 'There’s an important difference between being okay alone and avoiding, for protection, letting someone get too close — and given your pattern, it’s worth looking closely at which one is actually yours. Psychoanalyst Donald Winnicott described true capacity to be alone as something built from a secure base earlier on, not as a refusal of intimacy. When independence becomes a shield — handling everything alone, not letting anyone see the size of a struggle — it can, without meaning to, push away exactly the kind of care that would do you good. It isn’t about being less strong, it’s about letting someone, every now and then, hold part of the weight with you.',
  busca_completude: 'Your well-being seems to depend quite a bit on being in a relationship, or on getting outside confirmation that everything’s okay. That’s deeply human — nobody builds themselves alone — but it’s worth an honest question: are you building a life you love on your own terms, or waiting for a relationship to fill a gap only you can fill first? Psychoanalyst Donald Winnicott described the capacity to be alone as a prerequisite, not an obstacle, for healthy intimacy — because only someone who isn’t using the other person to feel whole can truly connect. That doesn’t devalue your desire for a relationship — it’s just an invitation to strengthen the foundation before building on top of it.'
};

const DAR_RECEBER_BLOCKS = {
  seguro: 'Researcher John Gottman spent decades observing couples and found that lasting relationships aren’t the ones that never fight — they’re the ones that respond well to each other’s “bids for connection”: a comment, a glance, a request for attention. Given your profile, you probably already do this well, almost without noticing — you give space, receive support, know how to ask for what you need without drama. Your role, then, isn’t to fix something broken in you — it’s to use that ease to help the person you love build that same sense of security, patiently, without pressure.',
  ansioso: 'You probably give a lot — attention, care, presence — but receiving, for you, comes loaded with a quiet question: “will this actually last?” Psychologist Sue Johnson, the creator of Emotionally Focused Therapy, describes how people with this attachment pattern tend to seek reassurance rather than simply trust the reassurance they’ve already received. The practice here isn’t to stop needing closeness — it’s to learn to receive without already bracing to lose it, and to voice the need before it turns into a demand.',
  evitativo: 'Giving, for you, often means fixing, taking care of, holding things up — doing, not necessarily feeling alongside. Receiving is the side that needs more practice: letting someone in before you’re exhausted from carrying everything alone. Therapist Esther Perel talks about how real intimacy requires a balance between autonomy and connection — never too little of either. You’ve already mastered autonomy. The practice now is allowing someone to take care of you too, without it feeling like a threat to your independence.',
  desorganizado: 'Giving and receiving, for you, probably don’t follow a fixed logic — they shift with the day, with the fear of the moment, with how much you trust whoever’s around at that specific time. That’s not inconsistency of character, it’s the mark of a system that learned, at the same time, that getting close is both good and dangerous. The most important practice here isn’t choosing between giving everything or giving nothing — it’s learning to notice, in the moment, which part of you is in charge, and saying that out loud to the person you love, instead of letting only the action speak for you.'
};

// Overall emotional "volume" — average reactivity on the scale
// questions (temperament, attachment, and wounds), regardless of which
// tag each one scores. Measures intensity, not direction: the farther
// from the center (3) a person marked, on average, the higher the
// emotional volume.
const VOLUME_EMOCIONAL_BLOCKS = {
  alto: 'Another thing worth noting: overall, your answers to the scale questions show relatively high emotional reactivity — you feel things at high volume, both what delights you and what bothers you. Neuroscientist Lisa Feldman Barrett, one of the leading voices in the neuroscience of emotion today, argues that emotions aren’t fixed, automatic reactions, but predictions the brain builds from signals in the body combined with past experience — the so-called predictive neuroscience of emotion. A high emotional volume isn’t a factory defect: it’s a brain that has learned, based on your history, to predict intensely. And because these are learned predictions, they can also be recalibrated, with awareness and repetition, over time.',
  medio: 'Another thing worth noting: overall, your answers to the scale questions show moderate emotional reactivity — you feel things clearly, but usually without being overtaken by the intensity of the moment. From the perspective of the predictive neuroscience of emotion, championed by researchers like Lisa Feldman Barrett, this suggests a system that predicts with relative balance: it reacts to what matters, without inflating everything along the way.',
  baixo: 'Another thing worth noting: overall, your answers to the scale questions show fairly measured emotional reactivity — you tend to register what you feel without being swept up by it. That usually works as an emotional stabilizer in a relationship, though it’s worth a word of caution: a low emotional volume on the outside is sometimes real regulation, and sometimes it’s emotion being felt inside with nowhere to go. It’s worth asking yourself, honestly, which one is true for you.'
};

const CLOSING =
  'None of this is a life sentence. A pattern isn’t a destiny — it’s just the path that, through repetition, became the easiest one to walk. Recognizing this isn’t about declaring yourself broken and waiting for someone to fix you, nor about reaching some solitary perfection before you deserve to be loved. It’s about knowing, clearly, where your most automatic reactions come from — so they stop deciding for you.\n\n' +
  'A healthy relationship isn’t born from two perfect people. It’s born from two people who know each other well enough to give what they have, ask for what they need, and communicate when an old fear is speaking louder than the present reality. No one needs to be anyone’s savior — just a witness and a partner in each other’s growth. That, truly, is multiplication: two whole stories, choosing to add themselves together, without either one needing to disappear to fit into the other.';
