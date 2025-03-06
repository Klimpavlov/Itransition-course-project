import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "../ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import createJiraTicket from "@/app/[locale]/api/jira/createJiraTicket";

const CreateJiraTicketModal = ({isOpen, onClose}) => {
    const [summary, setSummary] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [template, setTemplate] = useState("");
    const [loading, setLoading] = useState(false);
    const [ticketUrl, setTicketUrl] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        const link = window.location.href;
        // const response = await createJiraTicket(summary, priority, template, link);
        const response = await createJiraTicket(summary, template, link);

        if (response) {
            setTicketUrl(response);
        }

        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Support Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Label>Summary</Label>
                    <Input value={summary} onChange={(e) => setSummary(e.target.value)}/>

                    {/*<Label>Priority</Label>*/}
                    {/*<select value={priority} onChange={(e) => setPriority(e.target.value)}*/}
                    {/*        className="border rounded p-2 w-full">*/}
                    {/*    <option value="High">High</option>*/}
                    {/*    <option value="Medium">Medium</option>*/}
                    {/*    <option value="Low">Low</option>*/}
                    {/*</select>*/}

                    <Label>Template (optional)</Label>
                    <Input value={template} onChange={(e) => setTemplate(e.target.value)}/>
                </div>

                <DialogFooter>
                    {ticketUrl ? (
                        <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            View Ticket
                        </a>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Creating..." : "Submit"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateJiraTicketModal;
