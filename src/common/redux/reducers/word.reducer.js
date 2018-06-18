const WORD_SET = "WORD_SET"; 
 const initialState ="";
export default function cityReducer(state = initialState, { type, pyload }) {
  switch (type) {
    case WORD_SET:
	  return  pyload;
    default:
      return state;
  }
}

export function setWord(value) {
  return {
    type: WORD_SET,
    pyload: value
  };
}
