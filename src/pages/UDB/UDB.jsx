import { useState, useEffect } from "react";
import { supabase } from "../../lib/database/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faEdit,
  faTimes,
  faStar,
  faCheck,
  faDollarSign,
  faClock,
  faUserCog,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import "./UDB.css";

const UDB = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [newPackage, setNewPackage] = useState({
    name: "",
    duration: "3 Months",
    prices: {
      USD: "",
      EGP: "",
      SAR: "",
      AED: "",
      default: "",
    },
    benefits: [""],
    popular: false,
  });
  const [admins, setAdmins] = useState([]);
  const [activeTab, setActiveTab] = useState("packages");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    UC: "",
    email: "",
    password: "",
  });

  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/u-login");
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("UDB")
        .select("packages, admins")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        setPackages(data.packages || []);
        setAdmins(data.admins || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      if (!newAdmin.UC || !newAdmin.email || !newAdmin.password) {
        alert("All admin fields are required");
        return;
      }

      const updatedAdmins = [...admins, newAdmin];

      const { error } = await supabase
        .from("UDB")
        .upsert({ id: 1, admins: updatedAdmins });

      if (error) throw error;

      setAdmins(updatedAdmins);
      setIsAdminModalOpen(false);
      setNewAdmin({
        UC: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding admin:", error.message);
    }
  };

  const handleDeleteAdmin = async (adminEmail) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const updatedAdmins = admins.filter(
        (admin) => admin.email !== adminEmail,
      );

      const { error } = await supabase
        .from("UDB")
        .upsert({ id: 1, admins: updatedAdmins });

      if (error) throw error;

      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error deleting admin:", error.message);
    }
  };

  const handleAddPackage = async () => {
    try {
      // Validate required fields
      if (!newPackage.name || !newPackage.duration) {
        alert("Package name and duration are required");
        return;
      }

      const updatedPackages = [...packages, newPackage];

      const { error } = await supabase
        .from("UDB")
        .upsert({ id: 1, packages: updatedPackages });

      if (error) throw error;

      setPackages(updatedPackages);
      setIsAddModalOpen(false);
      setNewPackage({
        name: "",
        duration: "3 Months",
        prices: {
          USD: "",
          EGP: "",
          SAR: "",
          AED: "",
          default: "",
        },
        benefits: [""],
        popular: false,
      });
    } catch (error) {
      console.error("Error adding package:", error.message);
    }
  };

  const handleEditPackage = async () => {
    try {
      const updatedPackages = packages.map((pkg) =>
        pkg.name === currentPackage.name &&
        pkg.duration === currentPackage.duration
          ? currentPackage
          : pkg,
      );

      const { error } = await supabase
        .from("UDB")
        .upsert({ id: 1, packages: updatedPackages });

      if (error) throw error;

      setPackages(updatedPackages);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating package:", error.message);
    }
  };

  const handleDeletePackage = async (pkgName, pkgDuration) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const updatedPackages = packages.filter(
        (pkg) => !(pkg.name === pkgName && pkg.duration === pkgDuration),
      );

      const { error } = await supabase
        .from("UDB")
        .upsert({ id: 1, packages: updatedPackages });

      if (error) throw error;

      setPackages(updatedPackages);
    } catch (error) {
      console.error("Error deleting package:", error.message);
    }
  };

  const addBenefit = () => {
    setNewPackage((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }));
  };

  const removeBenefit = (index) => {
    setNewPackage((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const updateBenefit = (index, value) => {
    const updatedBenefits = [...newPackage.benefits];
    updatedBenefits[index] = value;
    setNewPackage((prev) => ({
      ...prev,
      benefits: updatedBenefits,
    }));
  };

  const addEditBenefit = (index, value) => {
    const updatedBenefits = [...currentPackage.benefits];
    updatedBenefits[index] = value;
    setCurrentPackage((prev) => ({
      ...prev,
      benefits: updatedBenefits,
    }));
  };

  const removeEditBenefit = (index) => {
    setCurrentPackage((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EGP", symbol: "EGP " },
    { code: "SAR", symbol: "SAR " },
    { code: "AED", symbol: "AED " },
  ];

  const durations = ["3 Months", "6 Months", "9 Months", "12 Months"];

  return (
    <div className="udb-container">
      <div className="udb-header">
        <h1>Admin Dashboard</h1>

        <div className="tabs">
          <button
            className={activeTab === "packages" ? "active" : ""}
            onClick={() => setActiveTab("packages")}
          >
            <FontAwesomeIcon icon={faStar} /> Packages
          </button>
          <button
            className={activeTab === "admins" ? "active" : ""}
            onClick={() => setActiveTab("admins")}
          >
            <FontAwesomeIcon icon={faUserShield} /> Admins
          </button>
        </div>

        {activeTab === "packages" ? (
          <motion.button
            className="add-btn"
            onClick={() => setIsAddModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Package
          </motion.button>
        ) : (
          <motion.button
            className="add-btn"
            onClick={() => setIsAdminModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Admin
          </motion.button>
        )}
      </div>

      {activeTab === "packages" && (
        <>
          <div className="currency-selector">
            <label>Display Prices in:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loading-packages">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="package-card loading" />
              ))}
            </div>
          ) : (
            <div className="packages-grid">
              {durations.map((duration) => {
                const durationPackages = packages.filter(
                  (pkg) => pkg.duration === duration,
                );
                if (durationPackages.length === 0) return null;

                return (
                  <div key={duration} className="duration-section">
                    <h2 className="duration-title">{duration} Plans</h2>
                    <div className="duration-packages">
                      {durationPackages.map((pkg, index) => (
                        <div
                          key={`${pkg.name}-${index}`}
                          className={`package-card ${pkg.popular ? "popular" : ""}`}
                        >
                          {pkg.popular && (
                            <div className="popular-badge">Most Popular</div>
                          )}
                          <div className="package-header">
                            <h3>{pkg.name}</h3>
                            <div className="package-price">
                              {pkg.prices[currency] || pkg.prices.default}
                            </div>
                            <div className="package-duration">
                              <FontAwesomeIcon icon={faClock} /> {pkg.duration}
                            </div>
                          </div>
                          <div className="package-benefits">
                            <ul>
                              {pkg.benefits.map((benefit, i) => (
                                <li key={i}>
                                  <FontAwesomeIcon icon={faCheck} /> {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="package-actions">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setCurrentPackage(pkg);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDeletePackage(pkg.name, pkg.duration)
                              }
                            >
                              <FontAwesomeIcon icon={faTrashAlt} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {activeTab === "admins" && (
        <div className="admins-table">
          {loading ? (
            <div className="loading-admins">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="admin-row loading" />
              ))}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>UC</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.UC}</td>
                    <td>{admin.email}</td>
                    <td className="actions">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteAdmin(admin.email)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add Package Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setIsAddModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>Add New Package</h2>
            <div className="form-group">
              <label>Package Name</label>
              <input
                type="text"
                value={newPackage.name}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, name: e.target.value })
                }
                placeholder="e.g., Basic Plan"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <select
                value={newPackage.duration}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, duration: e.target.value })
                }
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Prices</label>
              <div className="price-inputs">
                {currencies.map((curr) => (
                  <div key={curr.code} className="price-input">
                    <label>{curr.code}</label>
                    <input
                      type="text"
                      value={newPackage.prices[curr.code]}
                      onChange={(e) =>
                        setNewPackage({
                          ...newPackage,
                          prices: {
                            ...newPackage.prices,
                            [curr.code]: e.target.value,
                          },
                        })
                      }
                      placeholder={`${curr.symbol}0`}
                    />
                  </div>
                ))}
                <div className="price-input">
                  <label>Default</label>
                  <input
                    type="text"
                    value={newPackage.prices.default}
                    onChange={(e) =>
                      setNewPackage({
                        ...newPackage,
                        prices: {
                          ...newPackage.prices,
                          default: e.target.value,
                        },
                      })
                    }
                    placeholder="Default price"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Benefits</label>
              {newPackage.benefits.map((benefit, index) => (
                <div key={index} className="benefit-input">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => {
                      const updatedBenefits = [...newPackage.benefits];
                      updatedBenefits[index] = e.target.value;
                      setNewPackage({
                        ...newPackage,
                        benefits: updatedBenefits,
                      });
                    }}
                    placeholder="Enter benefit"
                  />
                  <button
                    className="remove-benefit"
                    onClick={() => removeBenefit(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
              <button className="add-benefit" onClick={addBenefit}>
                <FontAwesomeIcon icon={faPlus} /> Add Benefit
              </button>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newPackage.popular}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      popular: e.target.checked,
                    })
                  }
                />
                Mark as Popular
              </label>
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleAddPackage}>
                Save Package
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {isEditModalOpen && currentPackage && (
        <div
          className="modal-overlay"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setIsEditModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>Edit Package</h2>
            <div className="form-group">
              <label>Package Name</label>
              <input
                type="text"
                value={currentPackage.name}
                onChange={(e) =>
                  setCurrentPackage({ ...currentPackage, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <select
                value={currentPackage.duration}
                onChange={(e) =>
                  setCurrentPackage({
                    ...currentPackage,
                    duration: e.target.value,
                  })
                }
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Prices</label>
              <div className="price-inputs">
                {currencies.map((curr) => (
                  <div key={curr.code} className="price-input">
                    <label>{curr.code}</label>
                    <input
                      type="text"
                      value={currentPackage.prices[curr.code]}
                      onChange={(e) =>
                        setCurrentPackage({
                          ...currentPackage,
                          prices: {
                            ...currentPackage.prices,
                            [curr.code]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
                <div className="price-input">
                  <label>Default</label>
                  <input
                    type="text"
                    value={currentPackage.prices.default}
                    onChange={(e) =>
                      setCurrentPackage({
                        ...currentPackage,
                        prices: {
                          ...currentPackage.prices,
                          default: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Benefits</label>
              {currentPackage.benefits.map((benefit, index) => (
                <div key={index} className="benefit-input">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => {
                      const updatedBenefits = [...currentPackage.benefits];
                      updatedBenefits[index] = e.target.value;
                      setCurrentPackage({
                        ...currentPackage,
                        benefits: updatedBenefits,
                      });
                    }}
                  />
                  <button
                    className="remove-benefit"
                    onClick={() => removeEditBenefit(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
              <button
                className="add-benefit"
                onClick={() =>
                  addEditBenefit(currentPackage.benefits.length, "")
                }
              >
                <FontAwesomeIcon icon={faPlus} /> Add Benefit
              </button>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={currentPackage.popular}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
                      popular: e.target.checked,
                    })
                  }
                />
                Mark as Popular
              </label>
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleEditPackage}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Admin Modal */}
      {isAdminModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAdminModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setIsAdminModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>Add New Admin</h2>
            <div className="form-group">
              <label>UC</label>
              <input
                type="text"
                value={newAdmin.UC}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, UC: e.target.value })
                }
                placeholder="Enter UC"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                placeholder="Enter admin email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleAddAdmin}>
                Save Admin
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsAdminModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UDB;
