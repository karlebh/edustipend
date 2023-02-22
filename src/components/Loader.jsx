import "react-placeholder/lib/reactPlaceholder.css"
import { TextBlock } from "react-placeholder/lib/placeholders"

const Loader = (
  <div className="mt-3">
    <TextBlock
      rows={7}
      className=""
      color="rgb(229 231 235)"
      style={{ width: "100%", height: 80 }}
    />
    <TextBlock
      rows={7}
      className="mt-20"
      color="rgb(229 231 235)"
      style={{ width: "100%", height: 80 }}
    />
    <TextBlock
      rows={7}
      className="mt-20"
      color="rgb(229 231 235)"
      style={{ width: "100%", height: 80 }}
    />
  </div>
)

export default Loader
