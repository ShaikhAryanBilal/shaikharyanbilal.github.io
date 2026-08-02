import siteData from "@/content/site.json";
import homeData from "@/content/home.json";
import workData from "@/content/work.json";
import certificationsData from "@/content/certifications.json";
import contactData from "@/content/contact.json";
import workHistoryData from "@/content/workHistory.json";
import servicesData from "@/content/services.json";
import type { Site, Home, Work, Certifications, Contact, WorkHistory, Services } from "@/lib/types";

export const site: Site = siteData as unknown as Site;
export const home: Home = homeData as unknown as Home;
export const work: Work = workData as unknown as Work;
export const certifications: Certifications = certificationsData as unknown as Certifications;
export const contact: Contact = contactData as unknown as Contact;
export const workHistory: WorkHistory = workHistoryData as unknown as WorkHistory;
export const services: Services = servicesData as unknown as Services;
