import { useState } from "react";
import { FiCheck, FiEdit2, FiLock, FiShield, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import { MOCK_ADMIN_PROFILE } from "../data/mockAdminProfile";

function AdminProfile() {
  const [profile, setProfile] = useState(MOCK_ADMIN_PROFILE);
  const [draft, setDraft] = useState(MOCK_ADMIN_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const [securityNotice, setSecurityNotice] = useState("");

  const initials = profile.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  function startEditing() {
    setDraft(profile);
    setNotice("");
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(profile);
    setIsEditing(false);
    setNotice("");
  }

  function saveChanges(event) {
    event.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    setNotice("Changes saved for this session only.");
  }

  return (
    <AdminLayout title="Administrator profile">
      <div className="admin-profile">
        <section className="admin-profile__overview admin-card" aria-label="Profile overview">
          <div className="admin-profile__identity">
            <div className="admin-profile__avatar" aria-hidden="true">{initials || "AD"}</div>
            <div className="admin-profile__identity-copy">
              <p className="admin-eyebrow">ADMINISTRATOR ACCOUNT</p>
              <h2>{profile.fullName}</h2>
              <p className="admin-profile__email">{profile.email}</p>
              <div className="admin-profile__badges">
                <span className="admin-profile__badge">{profile.role}</span>
                <span className="admin-profile__badge admin-profile__badge--status">
                  <span aria-hidden="true" />
                  {profile.accountStatus}
                </span>
              </div>
            </div>
          </div>
          {!isEditing && (
            <button className="admin-profile__button admin-profile__button--primary" onClick={startEditing} type="button">
              <FiEdit2 aria-hidden="true" />
              Edit profile
            </button>
          )}
        </section>

        <div className="admin-profile__grid">
          <section className="admin-card admin-profile__card" aria-labelledby="admin-personal-title">
            <div className="admin-profile__section-heading">
              <span className="admin-profile__section-icon"><FiUser aria-hidden="true" /></span>
              <div>
                <h2 id="admin-personal-title">Personal information</h2>
                <p>Administrator account details.</p>
              </div>
            </div>

            {notice && <p className="admin-profile__notice" role="status">{notice}</p>}

            <form className="admin-profile__form" onSubmit={saveChanges}>
              <label className="admin-profile__field">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  disabled={!isEditing}
                  onChange={(event) => setDraft((current) => ({ ...current, fullName: event.target.value }))}
                  required
                  value={isEditing ? draft.fullName : profile.fullName}
                />
              </label>
              <label className="admin-profile__field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  disabled={!isEditing}
                  onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
                  required
                  type="email"
                  value={isEditing ? draft.email : profile.email}
                />
              </label>
              <label className="admin-profile__field">
                <span>Phone number</span>
                <input
                  autoComplete="tel"
                  disabled={!isEditing}
                  onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))}
                  type="tel"
                  value={isEditing ? draft.phone : profile.phone}
                />
              </label>
              <label className="admin-profile__field">
                <span>Username</span>
                <input
                  autoComplete="username"
                  disabled={!isEditing}
                  onChange={(event) => setDraft((current) => ({ ...current, username: event.target.value }))}
                  required
                  value={isEditing ? draft.username : profile.username}
                />
              </label>
              <label className="admin-profile__field">
                <span>Account creation date</span>
                <input disabled value={profile.accountCreated} />
              </label>
              {isEditing && (
                <div className="admin-profile__form-actions">
                  <button className="admin-profile__button admin-profile__button--primary" type="submit">
                    <FiCheck aria-hidden="true" />
                    Save changes
                  </button>
                  <button className="admin-profile__button" onClick={cancelEditing} type="button">
                    <FiX aria-hidden="true" />
                    Cancel
                  </button>
                </div>
              )}
            </form>
            <p className="admin-profile__demo-note">
              Profile changes are temporary and stored only in this page state.
            </p>
          </section>

          <div className="admin-profile__side">
            <section className="admin-card admin-profile__card" aria-labelledby="admin-security-title">
              <div className="admin-profile__section-heading">
                <span className="admin-profile__section-icon"><FiShield aria-hidden="true" /></span>
                <div>
                  <h2 id="admin-security-title">Security</h2>
                  <p>Account access and security information.</p>
                </div>
              </div>
              <dl className="admin-profile__details">
                <div>
                  <dt>Security status</dt>
                  <dd className="admin-profile__secure">{profile.securityStatus}</dd>
                </div>
                <div>
                  <dt>Last login</dt>
                  <dd>{profile.lastLogin}</dd>
                </div>
                <div>
                  <dt>Active sessions</dt>
                  <dd>{profile.activeSessions}</dd>
                </div>
              </dl>
              <button
                className="admin-profile__password-link"
                onClick={() => setSecurityNotice("Password management will be handled through Keycloak and is not connected yet.")}
                type="button"
              >
                <FiLock aria-hidden="true" />
                Change password
              </button>
              {securityNotice && (
                <p className="admin-profile__notice" role="status">{securityNotice}</p>
              )}
              <p className="admin-profile__demo-note">
                Password and session information is sample data; no security settings are changed here.
              </p>
            </section>

            <section className="admin-card admin-profile__card admin-profile__actions" aria-labelledby="admin-actions-title">
              <h2 id="admin-actions-title">Account actions</h2>
              <p>Sign out returns to the admin sign-in screen. No session is invalidated in this demo.</p>
              <Link className="admin-profile__button admin-profile__button--signout" to="/admin/login">
                Sign out
              </Link>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProfile;
