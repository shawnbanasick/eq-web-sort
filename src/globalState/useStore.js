import create from "zustand";
import createLocalPanelSlice from "./createLocalPanelSlice";
import createPresortSlice from "./createPresortSlice";
import createLandingSlice from "./createLandingSlice";
import createFooterSlice from "./createFooterSlice";
import createSortSlice from "./createSortSlice";
import createPostsortSlice from "./createPostsortSlice";
import createSubmitSlice from "./createSubmitSlice";
import createSurveySlice from "./createSurveySlice";

const useStore = create((set, get) => ({
  ...createFooterSlice(set, get),
  ...createLocalPanelSlice(set, get),
  ...createLandingSlice(set, get),
  ...createPresortSlice(set, get),
  ...createSortSlice(set, get),
  ...createPostsortSlice(set, get),
  ...createSubmitSlice(set, get),
  ...createSurveySlice(set, get),
}));

export default useStore;
