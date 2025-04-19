import { Button } from "../ui/button"
import {BsInfoCircleFill} from "react-icons/bs"
export default function DocumentForm() {
  return (
    <div className=" p-1 rounded-lg space-y-4 shadow-sm bg-white">
      <p className="text-sm font-medium">Train using document</p>
      <div className="flex flex-row gap-1 ">
        <BsInfoCircleFill className="text-gray-300"/> 
      <p className="text-xs text-muted-foreground">
       Supported file formats: txt, pdf, docx, pptx, csv
      </p>        
      </div>

      <div className="border border-dashed border-gray-300 bg-gray-100 rounded-md p-4 text-center text-sm text-muted-foreground">
        Drag or drop file to upload your file
      </div>
      <Button className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-md text-sm ">Start training</Button>
    </div>
  )
}
