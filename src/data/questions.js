const questions = [
  {
    id: 'name',
    type: 'text',
    label: 'introduce your internet avatar',
    placeholder: 'Your name / username...',
    required: true,
    section: 'Basic Info (but funny)'
  },
  {
    id: 'email',
    type: 'email',
    label: 'how can we contact you before this becomes illegal',
    placeholder: 'hello@example.com',
    required: true,
    section: 'Basic Info (but funny)'
  },
  {
    id: 'phone',
    type: 'text',
    label: 'Phone number',
    placeholder: '+91 98765 43210',
    required: true,
    section: 'Basic Info (but funny)'
  },
  {
    id: 'location',
    type: 'text',
    label: 'where in gurgaon are you surviving currently',
    placeholder: 'Sector / Area',
    required: true,
    section: 'Basic Info (but funny)'
  },
  {
    id: 'screentime',
    type: 'checkbox',
    label: 'how many hours of screen time are we working with here',
    placeholder: 'Choose one',
    required: true,
    options: [
      'healthy human',
      'concerning',
      'clinically online',
      'reels have replaced my personality'
    ],
    section: 'Personality / Internet Questions'
  },
  {
    id: 'toxic_trait',
    type: 'text',
    label: 'what’s your toxic trait',
    placeholder: 'Your answer...',
    required: true,
    section: 'Personality / Internet Questions'
  },
  {
    id: 'strongest_skill',
    type: 'text',
    label: 'drop your most unnecessary but strongest skill',
    description: 'e.g., making playlists, stalking internet trends, spotting cringe instantly, cinematic editing at 3am',
    placeholder: 'Your answer...',
    required: true,
    section: 'Personality / Internet Questions'
  },
  {
    id: 'brand_culture',
    type: 'text',
    label: 'which brand currently understands internet culture best',
    placeholder: 'Your answer...',
    required: true,
    section: 'Personality / Internet Questions'
  },
  {
    id: 'dumb_startup',
    type: 'text',
    label: 'pitch the dumbest startup idea possible',
    placeholder: 'Your answer...',
    required: true,
    section: 'Creativity Section'
  },
  {
    id: 'five_lakh_company',
    type: 'text',
    label: 'You\'re starting a company tomorrow with Rs.5 lakh. What do you build and what\'s your first move?',
    placeholder: 'Your answer...',
    required: true,
    section: 'Creativity Section'
  },
  {
    id: 'niche_hobby',
    type: 'text',
    label: 'What\'s something niche that you\'re way deep into? Any topic or hobby that you know way too much about.',
    placeholder: 'Your answer...',
    required: true,
    section: 'Creativity Section'
  },
  {
    id: 'function_interest',
    type: 'select',
    label: 'Which function are you interested in?',
    placeholder: 'Choose one',
    required: true,
    options: [
      'Lore Operations',
      'Chaos Engineering',
      'Ritual Research Lab',
      'Internet Damage Control',
      'Cinematic Propaganda Unit'
    ],
    section: 'Creativity Section'
  },
  {
    id: 'rabbit_holes',
    type: 'text',
    label: 'what kind of internet rabbit holes do you fall into',
    placeholder: 'Go deep...',
    required: true,
    section: 'Creativity Section'
  },
  {
    id: 'culturally_cool',
    type: 'text',
    label: 'what’s something culturally cool before brands ruin it',
    placeholder: 'Your answer...',
    required: true,
    section: 'Creativity Section'
  },
  {
    id: 'help_with',
    type: 'checkbox',
    label: 'what would you realistically want to help with',
    placeholder: 'Choose one',
    required: true,
    options: [
      'turning inside jokes into marketing',
      'doomscrolling with academic intent',
      'internet anthropology & doomscrolling research'
    ],
    section: 'Collaboration Energy'
  },
  {
    id: 'weekends',
    type: 'checkbox',
    label: 'are you okay with weekends disappearing mysteriously',
    placeholder: 'Choose one',
    required: true,
    options: [
      'yes',
      'no'
    ],
    section: 'Collaboration Energy'
  },
  {
    id: 'not_corporate',
    type: 'text',
    label: 'this is not corporate. thoughts?',
    placeholder: 'Long answer...',
    required: true,
    section: 'Collaboration Energy'
  }
];

export default questions;
