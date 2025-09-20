interface LinkItem {
  id: number;
  text: string;
  url: string;
}

interface SttResponse {
  data: {
    text?: string
    error?: string
  }
}

type Step = 'init' | 'start' | 'summary' | 'ask' | 'answer'