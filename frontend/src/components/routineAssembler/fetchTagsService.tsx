import axios from "axios"
import { TagsOption } from "./Tags"

const fetchTags = async () => {
    const response = await axios.get("api/tags")
    const data = response.data
    const tags = data.tags.map( (tag: { ID: number, Value: string}) => ({ IdTag: tag.ID, ID: tag.ID, value: tag.Value, label: tag.Value }))
    return tags
}

const filterTags = async (inputValue: string) => {
    const tagsOptions = await fetchTags() 

    return tagsOptions.filter((i : TagsOption) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};
  
const TagPromiseOptions = (inputValue: string) =>
    new Promise<TagsOption[]>((resolve) => {
    setTimeout(() => {
        resolve(filterTags(inputValue));
    }, 1000);
});

export default TagPromiseOptions

