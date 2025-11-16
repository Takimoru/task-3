import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Alert, AlertDescription } from "./ui/alert";
import { useState } from "react";

interface PostContent {
  onAddPost: (post: { title: string; content: string }) => void;
}

export function DialogDemo({ onAddPost }: PostContent) {
  const [showAlert, showAlertProps] = useState(false);
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: (values, { resetForm }) => {
      onAddPost(values);
      resetForm();

      showAlertProps(true);
      setTimeout(() => showAlertProps(false), 3000);
    },
  });

  return (
    <>
      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50 w-[300px]">
          <Alert>
            <AlertDescription>Post created successfully!</AlertDescription>
          </Alert>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={formik.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Create your post on form down bellow
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title-1">Title</Label>
                <Input
                  id="title-1"
                  name="title"
                  placeholder="Empty Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content-1">Content </Label>
                <Textarea
                  id="content-1"
                  name="content"
                  placeholder="write post here!"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
