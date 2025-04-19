import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WebsiteForm() {
  const [url, setUrl] = useState("");
  
  const handleExtract = () => {
    console.log("Extracting links from:", url);
  };

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium mb-2">Extract links from website/sitemap</h2>
      <div className="flex gap-2 items-center">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-gray-100 flex-grow focus:outline-none focus:ring-0 focus:border-brand-secondary"
        />
        <Button 
          variant="outline"
          onClick={handleExtract}
          className="text-brand-secondary border-brand-secondary hover:bg-brand-primary/10 hover:text-brand-secondary whitespace-nowrap"
        >
          Extract Links
        </Button>
      </div>
    </div>
  );
}