import { useAppState, PROFILE_ICONS } from '@/state/AppState';

export function ProfileSwitcher() {
  const { state, activeProfile, switchProfile, updateProfileMeta } = useAppState();

  return (
    <div className="profile-switcher" aria-label="Learner profiles">
      {state.profiles.map((profile) => (
        <button
          key={profile.id}
          type="button"
          className="btn btn--ghost"
          aria-pressed={profile.id === activeProfile.id}
          onClick={() => switchProfile(profile.id)}
          style={{
            borderColor:
              profile.id === activeProfile.id ? profile.avatarColor : undefined,
          }}
        >
          <span
            className="profile-switcher__dot"
            aria-hidden="true"
            style={{ background: profile.avatarColor }}
          />
          {profile.name}
        </button>
      ))}
      <label className="profile-switcher__label">
        Icon
        <select
          value={activeProfile.icon}
          onChange={(e) =>
            updateProfileMeta(activeProfile.id, {
              icon: e.target.value as (typeof PROFILE_ICONS)[number],
            })
          }
        >
          {PROFILE_ICONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
