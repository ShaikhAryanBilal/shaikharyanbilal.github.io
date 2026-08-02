import { site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="foot-copy">{site.footer.copyright} · All rights reserved.</p>
      </div>
    </footer>
  );
}
