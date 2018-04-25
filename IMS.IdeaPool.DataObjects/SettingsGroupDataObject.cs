using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace IMS.IdeaPool.DataObjects
{
    public class SettingsGroupDataObject
    {
        public SettingsGroupDataObject()
        {
            Settings = new List<SettingsDataObject>();
        }
        public int Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public List<SettingsDataObject> Settings { get; set; }

        public T GetValue<T>(string key)
        {
            T value = default(T);
            try
            {
                SettingsDataObject setting = Settings.Where(x => x.Key == key).SingleOrDefault();
                if (setting != null)
                {
                    var converter = TypeDescriptor.GetConverter(typeof(T));
                    if (converter != null)
                    {
                        value = (T)converter.ConvertFromString(setting.Value);
                    }
                }
            }
            catch { }
            return value;
        }
    }
}
