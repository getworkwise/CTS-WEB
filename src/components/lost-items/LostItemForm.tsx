// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Loader2, CalendarIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// const formSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(10, 'Description must be at least 10 characters'),
//   date_lost: z.date({
//     required_error: "Please select a date.",
//     invalid_type_error: "That's not a valid date!",
//   }),
//   location: z.string().min(1, 'Location is required'),
//   is_official_document: z.boolean(),
//   document_type: z.string().optional(),
//   document_number: z.string().optional(),
//   issuing_authority: z.string().optional(),
// });

// type FormData = z.infer<typeof formSchema>;

// interface LostItemFormProps {
//   onSubmit: (data: FormData) => Promise<void>;
// }

// export function LostItemForm({ onSubmit }: LostItemFormProps) {
//   const [isOfficialDocument, setIsOfficialDocument] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       date_lost: undefined,
//       location: '',
//       is_official_document: false,
//       document_type: '',
//       document_number: '',
//       issuing_authority: '',
//     },
//   });

//   const handleSubmit = async (data: FormData) => {
//     setIsSubmitting(true);
//     try {
//       console.log('Form data before submission:', data);
//       await onSubmit(data);
//       form.reset();
//     } catch (error) {
//       console.error('Error in LostItemForm handleSubmit:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Item Title</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., Blue Backpack" {...field} />
//               </FormControl>
//               <FormDescription>Provide a brief title for the lost item</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="Describe the item in detail..." {...field} />
//               </FormControl>
//               <FormDescription>Provide a detailed description of the lost item</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="date_lost"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Date Lost</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-[240px] pl-3 text-left font-normal",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value ? (
//                         format(field.value, "PPP")
//                       ) : (
//                         <span>Pick a date</span>
//                       )}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 The date when the item was lost
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="location"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Location</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g., Central Park" {...field} />
//               </FormControl>
//               <FormDescription>Where was the item lost?</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="is_official_document"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//               <div className="space-y-0.5">
//                 <FormLabel className="text-base">Official Document</FormLabel>
//                 <FormDescription>
//                   Is this an official document (ID, passport, etc.)?
//                 </FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={(checked) => {
//                     field.onChange(checked);
//                     setIsOfficialDocument(checked);
//                   }}
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         {isOfficialDocument && (
//           <>
//             <FormField
//               control={form.control}
//               name="document_type"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Document Type</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select document type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="national_id">National ID</SelectItem>
//                       <SelectItem value="passport">Passport</SelectItem>
//                       <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
//                       <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="document_number"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Document Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="issuing_authority"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Issuing Authority</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         )}
        
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Submitting...
//             </>
//           ) : (
//             'Submit Report'
//           )}
//         </Button>
//       </form>
//     </Form>
//   );
// }

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date_lost: z.date({
    required_error: "Please select a date.",
    invalid_type_error: "That's not a valid date!",
  }),
  location: z.string().min(1, 'Location is required'),
  is_official_document: z.boolean(),
  document_type: z.string().optional(),
  document_number: z.string().optional(),
  issuing_authority: z.string().optional(),
  issue_date: z.date().optional(),
  expiry_date: z.date().optional(), // Make expiry_date optional
});

type FormData = z.infer<typeof formSchema>;

interface LostItemFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export function LostItemForm({ onSubmit }: LostItemFormProps) {
  const [isOfficialDocument, setIsOfficialDocument] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date_lost: undefined,
      location: '',
      is_official_document: false,
      document_type: '',
      document_number: '',
      issuing_authority: '',
      issue_date: undefined,
      expiry_date: undefined,
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log('Form data before submission:', data);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error('Error in LostItemForm handleSubmit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Blue Backpack" {...field} />
              </FormControl>
              <FormDescription>Provide a brief title for the lost item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the item in detail..." {...field} />
              </FormControl>
              <FormDescription>Provide a detailed description of the lost item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_lost"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Lost</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date when the item was lost
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Central Park" {...field} />
              </FormControl>
              <FormDescription>Where was the item lost?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_official_document"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Official Document</FormLabel>
                <FormDescription>
                  Is this an official document (ID, passport, etc.)?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setIsOfficialDocument(checked);
                    console.log('is_official_document changed:', checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isOfficialDocument && (
          <>
            <FormField
  control={form.control}
  name="document_type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Document Type</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="national_id">National ID</SelectItem>
          <SelectItem value="passport">Passport</SelectItem>
          <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
          <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <FormDescription>
        Select the type of document you lost.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="document_number"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Document Number</FormLabel>
      <FormControl>
        <Input placeholder="e.g., 85525525" {...field} />
      </FormControl>
      <FormDescription>
        Enter the document number.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="issuing_authority"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Issuing Authority</FormLabel>
      <FormControl>
        <Input placeholder="e.g., NID" {...field} />
      </FormControl>
      <FormDescription>
        Enter the authority that issued the document.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        <FormField
              control={form.control}
              name="issue_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Issue Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date when the document was issued
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
              control={form.control}
              name="expiry_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date when the document expires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </Button>
      </form>
    </Form>
  );
}