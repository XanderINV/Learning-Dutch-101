import { useAppState, PROFILE_ICONS } from '@/state/AppState';

export function ProfileSwitcher() {
  const { state, activeProfile, switchProfile, updateProfileMeta } = useAppState();

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}
      aria-label="Learner profiles"
    >
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
            aria-hidden="true"
            style={{
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              background: profile.avatarColor,
              display: 'inline-block',
            }}
          />
          {profile.name}
        </button>
      ))}
      <label style={{ fontSize: '0.85rem' }}>
        Icon
        <select
          value={activeProfile.icon}
          onChange={(e) =>
            updateProfileMeta(activeProfile.id, {
              icon: e.target.value as (typeof PROFILE_ICONS)[number],
            })
          }
          style={{ marginLeft: '0.35rem' }}
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
