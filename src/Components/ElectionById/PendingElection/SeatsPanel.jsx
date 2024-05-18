import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import ElectionSeatCard from "../ElectionSeatCard";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import AvailableParties from "../AvailableParties";
import AvailableEmployees from "../AvailableEmployees";
import { useParams } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { useSeatOverviewByElection } from "../../../Hooks/Query/ElectionsQuery";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

function SeatsPanel({ status }) {
  const { id } = useParams();
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [addpartydialog, setdialog] = useState({
    show: false,
    data: null,
    type: null,
  });
  const [checked, setChecked] = useState(2); // 0 for prepared, 1 for unprepared // 2 for all
  const observer = useRef();
  const [total, setTotal] = useState(0);

  const {
    data,
    isError,
    error,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSeatOverviewByElection(id);

  const seats = useMemo(
    () => data?.pages.map((page) => page.data).flat() || [],
    [data]
  );

  useEffect(() => {
    setTotal(data?.pages[0]?.count);
  }, [data]);

  const handleFilter = useCallback(
    (completedOnly) => {
      let filtered;
      if (completedOnly === 0) {
        filtered = seats.filter((seat) => seat.prepared === true);
      } else if (completedOnly === 1) {
        filtered = seats.filter((seat) => seat.prepared === false);
      } else {
        filtered = seats;
      }

      // Remove duplicates
      const uniqueFilteredSeats = filtered.reduce((acc, current) => {
        const x = acc.findIndex((item) => item.id === current.id);
        if (x <= -1) {
          acc.push(current);
        }
        return acc;
      }, []);

      setFilteredSeats(uniqueFilteredSeats);
    },
    [seats]
  );

  useEffect(() => {
    handleFilter(checked);
  }, [checked, handleFilter]);

  useEffect(() => {
    const lastElementRef = (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    };

    return lastElementRef;
  }, [fetchNextPage, hasNextPage]);

  const handleRemove = (id) => {
    setFilteredSeats((prev) => prev.filter((seat) => seat.id !== id));
    setTotal((prev) => prev - 1);
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        padding: "20px 20px",
        borderRadius: "20px",
        width: "100%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        className="flex flex-wrap justify-content-center gap-3 "
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <div>
          <Badge value={"Total Seats " + total} />
        </div>

        {status === "pending" && (
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient3"
              name="pizza"
              value="All"
              checked={checked === 2}
              onChange={() => setChecked(2)}
            />
            <label htmlFor="ingredient3" className="ml-2">
              All
            </label>
          </div>
        )}
        {status === "pending" && (
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
              checked={checked === 0}
              onChange={() => setChecked(0)}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Prepared
            </label>
          </div>
        )}
        {status === "pending" && (
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient2"
              name="pizza"
              value="Mushroom"
              checked={checked === 1}
              onChange={() => setChecked(1)}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Unprepared
            </label>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          gap: "20px",
          flex: 1,
          minWidth: "50vw",
          maxHeight: "150vh",
          overflowY: "auto",
          minHeight: "50vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredSeats.map((election, index) => {
          if (filteredSeats.length === index + 1) {
            return (
              <div ref={observer.current} key={election.id}>
                <ElectionSeatCard
                  election={election}
                  handleRemove={handleRemove}
                  setdialog={setdialog}
                  status={status}
                />
              </div>
            );
          } else {
            return (
              <ElectionSeatCard
                key={election.id}
                election={election}
                handleRemove={handleRemove}
                setdialog={setdialog}
                status={status}
              />
            );
          }
        })}
        {(isFetchingNextPage || isFetching || isPending) && (
          <>
            <Skeleton width="250px" height="330px"></Skeleton>
            <Skeleton width="250px" height="330px"></Skeleton>
            <Skeleton width="250px" height="330px"></Skeleton>
          </>
        )}
        {
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={!hasNextPage}
              onClick={fetchNextPage}
              loading={isFetchingNextPage || isFetching || isPending}
              label={isFetchingNextPage ? "Loading..." : "Load More"}
              className="p-button-raised "
              style={{
                marginTop: "10px",
                height: "50px",
              }}
            />
          </div>
        }
      </div>

      <div className="card">
        <Dialog
          visible={addpartydialog.show}
          style={{ width: "100%", height: "100%" }}
          maximizable
          modal
          onHide={() =>
            setdialog({
              show: false,
              data: null,
              type: null,
            })
          }
          headerStyle={{
            padding: "5px",
          }}
        >
          {addpartydialog.data && addpartydialog.type == "party" && (
            <AvailableParties
              showParties={
                addpartydialog.show && addpartydialog.type == "party"
              }
              seatData={addpartydialog.data}
            />
          )}
          {addpartydialog.data && addpartydialog.type == "employee" && (
            <AvailableEmployees
              showEmployees={
                addpartydialog.show && addpartydialog.type == "employee"
              }
              seatData={addpartydialog.data}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default SeatsPanel;
