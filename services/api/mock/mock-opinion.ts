export type Opinion ={
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
}

export const MOCK_RATINGS: Opinion[] = [
  {
    id: 1,
    author: 'Roman Staś',
    avatar: 'https://i.imgur.com/gpXgFWP.jpeg',
    rating: 5,
    text: 'Fantastyczne miejsce do pracy! Zespół jest super, a projekty bardzo ciekawe.',
  },
  {
    id: 2,
    author: 'Magdalena B.',
    avatar: 'https://i.imgur.com/rjMjY3w.png',
    rating: 5,
    text: 'Świetna firma, gdzie się rozwija umiejętności i jest wspierana praca nad ważnymi projektami.',
  },
  {
    id: 3,
    author: 'Anna Kowalska',
    avatar: 'https://i.imgur.com/djCrIOc.jpeg',
    rating: 5,
    text: 'Polska perspektywa - ha. Rodzina (w sensie firma) rzeczywiście wspiera osoby w międzynarodowych zespołach.',
  },
  {
    id: 4,
    author: 'Piotr Nowak',
    avatar: 'https://i.imgur.com/l6fHBdF.jpeg',
    rating: 5,
    text: 'Fantastyczne miejsce do pracy! Zespół jest super, a projekty bardzo ciekawe.',
  },
];
