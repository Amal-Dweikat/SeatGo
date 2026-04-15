import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

type Filters = {
  passengers: number | null;
  sort: "new" | "old" | null;
  price: "low" | "high" | null;
  time: "earliest" | "latest" | null;
};

type Props = {
  filters: Filters;
  onChange: (value: Filters) => void;
};

export default function SortFilterDropdown({ filters, onChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const renderDropdown = (
    label: string,
    key: keyof Filters,
    options: (string | number)[]
  ) => {
    return (
      <View style={styles.dropdown}>
        
        {/* header */}
        <TouchableOpacity
          style={styles.header}
          onPress={() => toggle(key)}
        >
          <Text style={styles.label}>
            {label}: {filters[key] ?? "All"}
          </Text>
          <Text>{open === key ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {/* options */}
        {open === key && (
          <View style={styles.options}>
            {options.map((opt) => (
              <TouchableOpacity
                key={String(opt)}
                style={[
                  styles.option,
                  filters[key] === opt && styles.active,
                ]}
                onPress={() => {
                  onChange({
                    ...filters,
                    [key]: filters[key] === opt ? null : opt,
                  });
                  setOpen(null);
                }}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderDropdown("Passengers at least", "passengers", [2, 5, 10, 15])}
      {renderDropdown("Sort", "sort", ["new", "old"])}
      {renderDropdown("Price", "price", ["low", "high"])}
      {renderDropdown("Time", "time", ["earliest", "latest"])}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 1,
  },

  dropdown: {
    backgroundColor: "#fff",
    width: "48%",         
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,

    
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },

  label: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
  },

  options: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  option: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  active: {
    backgroundColor: "#4A90E2",
  },
});