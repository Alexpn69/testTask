class helperController {
  async getCurrencyFeed(req, res) {
    try {
      //Здесь приведен пример запроса на api с курсами валют
      const response = await fetch(
        "https://currate.ru/api/?get=currency_list&key=YOUR-API-KEY",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new helperController();
