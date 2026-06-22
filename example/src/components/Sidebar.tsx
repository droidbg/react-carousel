import { nav } from "../data";

/** Left navigation. `active` is the scroll-spy's current section id. */
export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="sidebar">
      {nav.map((group) => (
        <div className="sidebar__group" key={group.group}>
          <p className="sidebar__title">{group.group}</p>
          {group.items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`sidebar__link${active === id ? " is-active" : ""}`}>
              {label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}
