export type MentalHealthProblem = {
  id: string;
  name: string;
  description: string;
  affectedOrgans: string[];
  hormones: Hormone[];
  symptoms: string[];
  solutions: Solution[];
};

export type Hormone = {
  name: string;
  effect: string;
  color: string;
};

export type Solution = {
  name: string;
  description: string;
  type: 'breathing' | 'meditation' | 'exercise' | 'social' | 'sleep';
};

export type OrganDetail = {
  name: string;
  impact: string;
  hormones: string;
};

export const ORGAN_DETAILS: Record<string, OrganDetail> = {
  brain: {
    name: 'Brain',
    impact: 'The amygdala triggers the fight-or-flight response, while the prefrontal cortex (rational thinking) may become less active.',
    hormones: 'Increased Cortisol and Norepinephrine.'
  },
  heart: {
    name: 'Heart',
    impact: 'Heart rate increases and blood vessels constrict to pump more blood to muscles, preparing for action.',
    hormones: 'Adrenaline (Epinephrine) surge.'
  },
  adrenals: {
    name: 'Adrenal Glands',
    impact: 'These glands sit atop the kidneys and are responsible for releasing stress hormones into the bloodstream.',
    hormones: 'Cortisol and Adrenaline production center.'
  },
  'nervous-system': {
    name: 'Nervous System',
    impact: 'The sympathetic nervous system becomes dominant, increasing alertness but potentially causing restlessness.',
    hormones: 'Norepinephrine release.'
  }
};

export const PROBLEMS: MentalHealthProblem[] = [
  {
    id: 'stress',
    name: 'Stress',
    description: 'A state of mental or emotional strain resulting from adverse or demanding circumstances.',
    affectedOrgans: ['brain', 'heart', 'adrenals'],
    hormones: [
      { name: 'Cortisol', effect: 'Increases blood sugar and suppresses immune system.', color: '#ff4d4d' },
      { name: 'Adrenaline', effect: 'Increases heart rate and blood pressure.', color: '#ffa64d' }
    ],
    symptoms: ['Rapid heartbeat', 'Headaches', 'Muscle tension', 'Irritability'],
    solutions: [
      { name: 'Box Breathing', description: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.', type: 'breathing' },
      { name: 'Physical Activity', description: 'A 20-minute walk can lower cortisol.', type: 'exercise' }
    ]
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
    description: 'Persistent, excessive worries that don\'t go away even in the absence of a stressor.',
    affectedOrgans: ['brain', 'nervous-system', 'heart'],
    hormones: [
      { name: 'Adrenaline', effect: 'Triggers fight-or-flight response.', color: '#ffa64d' },
      { name: 'Norepinephrine', effect: 'Increases alertness and arousal.', color: '#ffff4d' }
    ],
    symptoms: ['Restlessness', 'Panic attacks', 'Sweating', 'Difficulty concentrating'],
    solutions: [
      { name: 'Grounding 5-4-3-2-1', description: 'Identify 5 things you see, 4 you can touch...', type: 'meditation' },
      { name: 'Deep Breathing', description: 'Slow, rhythmic breaths to calm the nervous system.', type: 'breathing' }
    ]
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'A mood disorder that causes a persistent feeling of sadness and loss of interest.',
    affectedOrgans: ['brain', 'digestive-system'],
    hormones: [
      { name: 'Serotonin', effect: 'Low levels affect mood, sleep, and appetite.', color: '#4d79ff' },
      { name: 'Dopamine', effect: 'Low levels reduce motivation and pleasure.', color: '#ff4dff' }
    ],
    symptoms: ['Low energy', 'Changes in appetite', 'Sleep disturbances', 'Hopelessness'],
    solutions: [
      { name: 'Social Connection', description: 'Talking to a friend can boost oxytocin.', type: 'social' },
      { name: 'Light Exposure', description: 'Morning sunlight helps regulate serotonin.', type: 'sleep' }
    ]
  },
  {
    id: 'burnout',
    name: 'Burnout',
    description: 'Emotional, physical, and mental exhaustion caused by excessive and prolonged stress.',
    affectedOrgans: ['brain', 'immune-system'],
    hormones: [
      { name: 'Cortisol', effect: 'Chronically high levels lead to exhaustion.', color: '#ff4d4d' }
    ],
    symptoms: ['Cynicism', 'Reduced efficacy', 'Chronic fatigue'],
    solutions: [
      { name: 'Digital Detox', description: 'Unplug from screens to rest the brain.', type: 'sleep' },
      { name: 'Boundary Setting', description: 'Learn to say no to extra study loads.', type: 'social' }
    ]
  },
  {
    id: 'sleep-deprivation',
    name: 'Sleep Deprivation',
    description: 'The condition of not having enough sleep; it can be either chronic or acute.',
    affectedOrgans: ['brain', 'immune-system', 'metabolism'],
    hormones: [
      { name: 'Melatonin', effect: 'Disrupted production affects sleep cycles.', color: '#9933ff' },
      { name: 'Ghrelin', effect: 'Increases hunger and cravings.', color: '#33cc33' }
    ],
    symptoms: ['Memory issues', 'Mood changes', 'Weakened immunity'],
    solutions: [
      { name: 'Sleep Hygiene', description: 'Consistent bedtime and cool room temperature.', type: 'sleep' },
      { name: 'No Caffeine', description: 'Avoid caffeine 6 hours before bed.', type: 'sleep' }
    ]
  }
];
