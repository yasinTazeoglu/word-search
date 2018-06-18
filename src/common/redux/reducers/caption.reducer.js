const CAPTION_GET = "CAPTION_GET";
const initialState = {};
export default function cityReducer(state = initialState, { type, pyload }) {
  switch (type) {
    case CAPTION_GET:
	  return  pyload;
    default:
      return state;
  }
}

export function getCaption(value) {
  return {
    type: CAPTION_GET,
    pyload: value
  };
}
