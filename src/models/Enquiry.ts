import mongoose, { Schema, Types, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: 'study-abroad' | 'mbbs-abroad';
  message?: string;
  status: 'pending' | 'contacted' | 'resolved' | 'closed';
  related_college_id?: Types.ObjectId;
  related_exam_id?: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [100, 'Email cannot exceed 100 characters'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    interest: {
      type: String,
      required: [true, 'Interest is required'],
      enum: {
        values: ['study-abroad', 'mbbs-abroad'],
        message: 'Interest must be either study-abroad or mbbs-abroad'
      }
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['pending', 'contacted', 'resolved', 'closed'],
        message: 'Status must be pending, contacted, resolved, or closed'
      },
      default: 'pending'
    },
    related_college_id: { 
      type: Types.ObjectId, 
      ref: "College" 
    },
    related_exam_id: { 
      type: Types.ObjectId, 
      ref: "Exam" 
    },
  },
  { 
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
  }
);

// Add indexes for better performance
EnquirySchema.index({ created_at: -1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ interest: 1 });
EnquirySchema.index({ email: 1 });

export default mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
